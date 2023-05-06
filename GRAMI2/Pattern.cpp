#include "Pattern.h"
#include <set>
#include <algorithm>
#include <string>
#include <iostream>

using namespace std;

bool contain(std::set<Grami::Node*>* set, Grami::Node* elem)
{
	if (set == nullptr) {
		return false;
	}
	return set->find(elem) != set->end();
}


int multisetPriorityCompare(std::map<ushort, std::multiset<ushort>*>& connectedNodeIdxs, ushort idx1, ushort idx2) {


	std::multiset<ushort>* multiset1 = connectedNodeIdxs[idx1];
	std::multiset<ushort>* multiset2 = connectedNodeIdxs[idx2];

	if (multiset1 == nullptr)
	{
		if (multiset2 != nullptr)
		{
			return 1;
		}
	}
	else { // multiset1 != nullptr
		if (multiset2 == nullptr)
		{
			return -1;
		}
		else { // multiset1 != nullptr && multiset2 !=nullptr
			std::multiset<ushort>::iterator it1 = multiset1->begin();
			std::multiset<ushort>::iterator it2 = multiset2->begin();
			while (true)
			{
				if (it1 == multiset1->end()) {
					if (it2 != multiset2->end())
					{
						return 1;
					}
					return 0;
				}
				else { // if (it1 != multiset1->end()) {
					DP(it1 != multiset1->end());
					if (it2 == multiset2->end())
					{
						return -1;
					}
					DP(it2 != multiset2->end());
					if (*it1 > *it2) // compare after change value
					{
						return -1;
					}
					else if (*it1 < *it2)
					{
						return 1;
					}
					DP(*it1 == *it2);
				}
				++it1;
				++it2;
			}
			DP(it1 == multiset1->end());
			DP(it2 == multiset2->end());
		}
	}
	return 0;
}

void Grami::Pattern::copyEdgesFromParent(std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>* parent)
{
	for (std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>::iterator it =
		parent->begin();
		it != parent->end();
		++it) {
		(*(this->edgeTypes))[it->first] = new std::set<edgeLabel_t>(*(it->second));
	}
}

int Grami::Pattern::nodeIDXPriorityCompare(ushort idx1, ushort idx2)
{
	if ((*(this->nodeLabels))[idx1] > (*(this->nodeLabels))[idx2])
	{
		return -1;
	}
	if ((*(this->nodeLabels))[idx1] < (*(this->nodeLabels))[idx2])
	{
		return 1;
	}
	DP((*(this->nodeLabels))[idx1] == (*(this->nodeLabels))[idx2]);
	
	return 0;
}

std::string Grami::Pattern::toString(bool withParent) const
{
	std::string ret;
	ret += "#node:" + std::to_string(this->getNumOfNodes());
	ret += "\t#edge:" + std::to_string(this->getNumOfEdges());
	ret += '\n';

	ret += "newEdge:" + std::to_string(this->srcNodeLabel) + "-(" +
		std::to_string(this->newEdgeLabel) + ")-" +
		std::to_string(this->destNodeLabel) + "\n";
	ret += "node to be growth:" + std::to_string(this->getGrowNodeIdx())+"\n";
	for (uint i = 0; i < this->getNumOfNodes(); i++)
	{
		ret += (std::to_string(i) + ":" + std::to_string((*this->nodeLabels)[i]) + "\n");
	}
	for (
		std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>::iterator it = ((Pattern*)this)->edgeTypes->begin();
		it != this->edgeTypes->end();
		++it)
	{
		std::pair<ushort, ushort> pair = it->first;
		std::set<edgeLabel_t>* lset = it->second;
		for (
			std::set<edgeLabel_t>::iterator it2 = lset->begin();
			it2 != lset->end();
			it2++
			) {
			ret += (
				std::to_string(pair.first) + ":" + std::to_string((*this->nodeLabels)[pair.first]) +
				"-(" + std::to_string(*it2) + ")-" +
				std::to_string(pair.second) + ":" + std::to_string((*this->nodeLabels)[pair.second]) +
				"\n"
				);
		}
	}
	if (withParent == true) {
		DP(this->parentPattern != nullptr);
		ret += "nodeIdx in its parent pattern:" + std::to_string(this->srcNodeIdxInParentInstances) + "," + std::to_string(this->destNodeIdxInParentInstances);


		ret += "\n\n" + this->parentPattern->toString(false);
	}
	return ret;
}

void Grami::Pattern::setFreq(uint freq)
{
	this->frequence = freq;
}

ushort Grami::Pattern::getGrowNodeIdx() const
{
	return this->lastAddedNodeIdx;
}

void Grami::Pattern::setGrowNodeIdx(ushort idx)
{
	this->lastAddedNodeIdx = idx;
}

bool Grami::Pattern::isGrownByInnerEdge() const
{
	DP(this->parentPattern != nullptr);
	return (this->getNumOfNodes() == this->parentPattern->getNumOfNodes());
}

Grami::Pattern::Pattern(Pattern* parentPattern)
{
	

	this->parentPattern = parentPattern;
	this->instances = new Instances();
	this->edgeTypes = new std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>();

	if (parentPattern != nullptr) {

		this->nodeLabels = new std::vector<nodeLabel_t>(*(parentPattern->nodeLabels));

		this->seed = false;
		
		this->copyEdgesFromParent(parentPattern->getEdgeTypes());

		this->frequence = 0;
	}
	else {
		this->nodeLabels = new std::vector<nodeLabel_t>();
	}

}

Grami::Pattern::~Pattern()
{
	if (this->instances != nullptr)
	{
		delete this->instances;
	}
	delete this->nodeLabels;
}

void Grami::Pattern::calcFreq()
{
	DP(this->parentPattern != nullptr);

	uint numOfNodesInParentPattern = this->parentPattern->getNumOfNodes();
	uint* pVertexIDs = new uint[numOfNodesInParentPattern];
	uint tempFreq = 0;

	uint* idxConvertArr = new uint[this->getNumOfNodes()]; // parent [a,b,c] -> current [a,d,b,c] : indexConverArr[0]=0;indexConverArr[1]=0xffffffff; indexConverArr[2]=1;indexConverArr[3]=2;

	if (this->isGrownByInnerEdge())
	{
		for (uint i = 0; i < this->parentPattern->getFreq(); i++)
		{
			// procetss the i-th instance
			for (uint j = 0; j < numOfNodesInParentPattern; j++)
			{
				pVertexIDs[j] = this->parentPattern->getIDofIthNodeForJthInstance(j, i);
			}

			updateCounter();

			Node* srcNode = this->graph->getNode(pVertexIDs[this->srcNodeIdxInParentInstances]); // src Node (of the i-th instance) of the added edge

			Node* destNode = this->graph->getNode(pVertexIDs[this->destNodeIdxInParentInstances]); // src Node (of the i-th instance) of the added edge

			DP(srcNode->getLabel() == this->srcNodeLabel);
			DP(destNode->getLabel() == this->destNodeLabel);

			std::set<Node*>* destNodes = srcNode->getNodesIdByEdge(newEdgeLabel); //

			if (contain(destNodes, destNode) == true)
			{
				++tempFreq;
				for (uint j = 0; j < this->getNumOfNodes(); j++)
				{
					uint newIdx = idxConvertArr[j];
					this->instances->write(pVertexIDs[newIdx]);
				}
				this->instances->incNumOfInstances();
			}
		}
	}
	else {
		for (uint i = 0; i < this->parentPattern->getFreq(); i++)
		{
			// procetss the i-th instance
			std::set<nodeID_t> usedNodeIDs;
			for (uint j = 0; j < numOfNodesInParentPattern; j++)
			{
				pVertexIDs[j] = this->parentPattern->getIDofIthNodeForJthInstance(i, j);
				usedNodeIDs.insert(pVertexIDs[j]);
			}

			Node* srcNode = this->graph->getNode(pVertexIDs[this->srcNodeIdxInParentInstances]); // src Node (of the i-th instance) of the added edge

			DP(srcNode->getLabel() == srcNodeLabel);

			std::set<Node*>* destNodes = srcNode->getNodesIdByEdge(newEdgeLabel); //
			for (std::set<Node*>::iterator it = destNodes->begin();
				it != destNodes->end();
				++it)
			{
				nodeID_t thisNodeID = (*it)->getNodeID();
				if (usedNodeIDs.find(thisNodeID) != usedNodeIDs.end())
				{
					++tempFreq;
					for (uint j = 0; j < this->getNumOfNodes(); j++)
					{
						uint newIdx = idxConvertArr[j];
						if (newIdx == 0xffffffff)
						{
							this->instances->write(thisNodeID);
						}
						else {
							this->instances->write(pVertexIDs[newIdx]);
						}
					}
					this->instances->incNumOfInstances();
				}
			}
		}
	}


	this->frequence = tempFreq;

	delete[] idxConvertArr;
	delete[] pVertexIDs;
}


uint Grami::Pattern::getFreq() const
{
	DP(this->isFreqComputed() == true);
	return this->frequence;
}

bool Grami::Pattern::isFreqComputed() const
{
	return (this->frequence != 0xffffffff);
}

uint Grami::Pattern::getNumOfNodes() const
{
	return this->nodeLabels->size();
}

uint Grami::Pattern::getNumOfEdges() const
{
	return this->edgeTypes->size();
}

nodeID_t Grami::Pattern::getIDofIthNodeForJthInstance(uint i, uint j) const
{
	return this->instances->getIDofIthNodeForJthInstance(i, j);
}

bool Grami::Pattern::isExtended() const
{
	return this->extended;
}

bool Grami::Pattern::isCanonical()
{
	for (uint i = 0; i < this->nodeLabels->size() - 1; i++)
	{
		if (this->nodeIDXPriorityCompare(i, i + 1) == -1)
		{
			return false;
		}
	}

	std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>::iterator it1 = this->edgeTypes->begin();
	std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>::iterator it2 = this->edgeTypes->begin();
	++it2;
	for (; it2 != this->edgeTypes->end(); ++it1, ++it2) {
		DP(it1->first.first <= it1->first.second);
		DP(it2->first.first <= it2->first.second);

		// compare srcNodeIdx
		if (it1->first.first > it2->first.first) 
		{
			return false;
		}
		else if (it1->first.first < it2->first.first) 
		{
			continue;
		}
		else if (it1->first.second > it2->first.second) {
			DP(it1->first.first == it2->first.first);
			return false;
		}
		else if (it1->first.second < it2->first.second) {
			DP(it1->first.first == it2->first.first);
			continue;
		}
		else // if (it1->first.first  == it2->first.first ) // compare edgeLabel
		{
			DP(false);
		}
	}



	return true;
}

void Grami::Pattern::swapNodeLoc(ushort idx1, ushort idx2, std::vector<ushort>& originalLoc) {
	//swap originLoc
	ushort temp = originalLoc[idx1];
	originalLoc[idx1] = originalLoc[idx2];
	originalLoc[idx2] = temp;

	// swap nodeLabels
	temp = (*(this->nodeLabels))[idx1];
	(*(this->nodeLabels))[idx1] = (*(this->nodeLabels))[idx2];
	(*(this->nodeLabels))[idx2] = temp;

}


void Grami::Pattern::canonicalize()
{
	bool transfer = false;
	// node order --> 1. label, 2. prevConnectedNode, 3. nextConnectedNode
	std::vector<ushort> originalLoc(this->nodeLabels->size());
	// transferIdx[i] = j -> nodeLabels[i] will be moved to nodeLabels[j]

	for (ushort i = 0; i < originalLoc.size(); i++)
	{
		originalLoc[i] = i;
	}

	// insertion sort by node label only
	for (ushort j = 1; j < this->nodeLabels->size(); j++) {
		short loc = j;
		while (loc - 1 >= 0 && (*(this->nodeLabels))[loc - 1] > (*(this->nodeLabels))[loc]) {
			this->swapNodeLoc(loc - 1, loc, originalLoc);
			transfer= true;
		}
#ifdef DEBUG
		for (uint k = 0; k < j; ++k) {
			DP((*(this->nodeLabels))[k] <= (*(this->nodeLabels))[k + 1]);
		}
#endif // DEBUG

	}

	if (transfer == true) {
		std::vector<ushort> transferIdx(this->nodeLabels->size());
		for (uint i = 0; i < this->nodeLabels->size(); i++)
		{
			transferIdx[originalLoc[i]] = i;
		}

		std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>* convertedMap = new std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>();
		for (
			std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>::iterator it = this->edgeTypes->begin();
			it != this->edgeTypes->end();
			++it
			) {
			std::pair<ushort, ushort> thisPair = it->first;
			ushort first = transferIdx[thisPair.first];
			ushort second = transferIdx[thisPair.second];
			if (second < first) {
				first = transferIdx[thisPair.second];
				second = transferIdx[thisPair.first];
			}
			std::pair<ushort, ushort> convertedPair= std::pair<ushort, ushort>(first,second);
			(*convertedMap)[convertedPair] = it->second;
		}
		delete this->edgeTypes;
		this->edgeTypes = convertedMap;
	
	}

	

	DP(this->isCanonical() == true);

}

nodeLabel_t Grami::Pattern::getLabelofIthNode(uint i) const
{
	return (*(this->nodeLabels))[i];
}

std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>* Grami::Pattern::getEdgeTypes()
{
	return (this->edgeTypes);
}

void Grami::Pattern::insertNodeLabel(nodeLabel_t l)
{
	this->nodeLabels->push_back(l);
	this->instances->incNumOfNodes();
}

void Grami::Pattern::insertEdge(ushort idx1, ushort idx2, edgeLabel_t e)
{
	DP(idx1 <= idx2);
	
	this->seed = false;

	this->newEdgeLabel = e;
	this->srcNodeLabel = (*(this->nodeLabels))[idx1];
	this->destNodeLabel = (*(this->nodeLabels))[idx2];
	this->srcNodeIdxInParentInstances = idx1;
	this->destNodeIdxInParentInstances = idx2;
	


	std::pair<ushort, ushort> key = { idx1,idx2 };
	std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>::iterator it =
		this->edgeTypes->find(key);
	
	if (it == this->edgeTypes->end()) {
		(*(this->edgeTypes))[key] = new std::set<edgeLabel_t>();
		(*(this->edgeTypes))[key]->insert(e);
	}
	else {
		it->second->insert(e);
	}
}

void Grami::Pattern::write(nodeID_t id)
{
	this->instances->write(id);
}

void Grami::Pattern::incNumOfInstances()
{
	this->instances->incNumOfInstances();
}

uint Grami::Pattern::getNumOfInstances() const
{
	return this->instances->getNumOfInstances();
}

void Grami::Pattern::setSeed(bool b)
{
	this->seed = b;
}

bool Grami::Pattern::isSeed() const
{
	return this->seed;
}

void Grami::Pattern::clearInstances()
{
	DP(this->instances != nullptr);
	delete this->instances;
	this->instances = nullptr;
}

Grami::Instances * Grami::Pattern::getInstances() const
{
	return this->instances;
}

void Grami::Pattern::show() const
{
	cout << this->toString() << endl;
}

bool Grami::cmpForPattern::operator()(Grami::Pattern * a, Grami::Pattern * b) const
{
	DP(a->isCanonical() == true);
	DP(b->isCanonical() == true);

	if (a->getNumOfNodes() < b->getNumOfNodes())
	{
		return true;
	}
	else if (a->getNumOfNodes() > b->getNumOfNodes())
	{
		return false;
	}

	if (a->getNumOfEdges() < b->getNumOfEdges())
	{
		return true;
	}
	else if (a->getNumOfEdges() > b->getNumOfEdges())
	{
		return false;
	}

	for (uint i = 0; i < a->getNumOfNodes(); ++i)
	{
		if (a->getLabelofIthNode(i) < b->getLabelofIthNode(i))
		{
			return true;
		}
		else if (a->getLabelofIthNode(i) > b->getLabelofIthNode(i))
		{
			return false;
		}
	}

	std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>* edge1 = a->getEdgeTypes();
	std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>* edge2 = b->getEdgeTypes();
	std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>::iterator it1 = edge1->begin();
	std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>::iterator it2 = edge2->begin();

	while (it1 != edge1->end())
	{

		DP(it1->first.first <= it1->first.second);
		DP(it2->first.first <= it2->first.second);

		if (it1->first.first < it2->first.first)
		{
			return true;
		}
		else if (it1->first.first > it2->first.first)
		{
			return false;
		}

		if (it1->first.second < it2->first.second)
		{
			return true;
		}
		else if (it1->first.second > it2->first.second)
		{
			return false;
		}

		std::set<edgeLabel_t>*  edgeType1 = it1->second;
		std::set<edgeLabel_t>*  edgeType2 = it2->second;

		if (edgeType1->size() < edgeType2->size())
		{
			return true;
		}
		else if (edgeType1->size() > edgeType2->size())
		{
			return false;
		}

		std::set<edgeLabel_t>::iterator it11 = edgeType1->begin();
		std::set<edgeLabel_t>::iterator it22 = edgeType2->begin();
		while (it11 != edgeType1->end())
		{
			if (*it11 < *it22)
			{
				return true;
			}
			else if (*it11 > *it22)
			{
				return false;
			}
			++it11;
			++it22;
		}

		++it1;
		++it2;
	}

	return false;
}
