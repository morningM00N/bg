#include "CoreAlgo.h"
#include <iostream>
#include <string>

using namespace std;

vector<Grami::Pattern*>* Grami::CoreAlgo::getFrequentPatterns(Graph& g)
{
	vector<Grami::Pattern*>* ret = new vector<Grami::Pattern*>();
	this->freq = freq;
	this->removeInfrequentItems(g);
	vector<Pattern*>* seeds = this->generateSeed();
	vector<Pattern*>* prevSeeds = nullptr;

	while (true)
	{
		vector<Pattern*>* newPattern = this->patternGrowth(seeds);
		for (uint i = 0; i < seeds->size(); i++)
		{
			if ((*seeds)[i]->isExtended() == false)
			{
				(*seeds)[i]->clearInstances();
				ret->push_back((*seeds)[i]);
			}
		}

		if (prevSeeds != nullptr)
		{
			for (uint i = 0; i < prevSeeds->size(); i++)
			{
				if ((*prevSeeds)[i]->isExtended() == true)
				{
					(*prevSeeds)[i]->clearInstances();
				}
				else {
					DP((*prevSeeds)[i]->getInstances() == nullptr);
				}
			}
			delete prevSeeds;
		}

		if (newPattern->size() == 0)
		{
			break;
		}


		prevSeeds = seeds;
		seeds = newPattern;
	}

	return ret;
}

void Grami::CoreAlgo::removeInfrequentItems(Graph& g)
{
	this->graph = &g;

	this->nodeLabelCount.resize(g.getMaxNodeLabel() + 1, 0);
	this->edgeLabelCount.resize(g.getMaxEdgeLabel() + 1, 0);

	for (uint i = 0; i < this->nodeLabelCount.size(); i++)
	{
		this->neighborNodeLabelsByNodeLabel[i] = new set<nodeLabel_t>();
		this->connectEdgeLabelsByNodeLabel[i] = new set<edgeLabel_t>();
	}

	for (size_t n = 0; n < g.getNodes().size(); n++)
	{
		Node* thisNode = g.getNode(n);
		if (thisNode == nullptr)
		{
			continue;
		}
		DP(this->nodeLabelCount.size() > thisNode->getLabel());

		nodeLabel_t srcNodeLabel = thisNode->getLabel();

		this->nodeLabelCount[srcNodeLabel] += 1;
		for (size_t e = 0; e < thisNode->getEdgeCount(); e++)
		{
			pair<edgeLabel_t, Node*> edge = thisNode->getEdge(e);

			edgeLabel_t el = edge.first;
			nodeLabel_t destNodeLabel = edge.second->getLabel();

			this->neighborNodeLabelsByNodeLabel[srcNodeLabel]->insert(destNodeLabel);
			this->connectEdgeLabelsByNodeLabel[srcNodeLabel]->insert(el);

			this->neighborNodeLabelsByNodeLabel[destNodeLabel]->insert(srcNodeLabel);
			this->connectEdgeLabelsByNodeLabel[destNodeLabel]->insert(el);

			if (thisNode->getNodeID() > edge.second->getNodeID())
			{
				continue;
			}

			DP(this->edgeLabelCount.size() > edge.first);
			this->edgeLabelCount[edge.first] += 1;
		}
	}

	for (uint i = 0; i < this->nodeLabelCount.size(); i++)
	{

		if (this->nodeLabelCount[i] >= freq)
		{
			this->orderedFrequentNodeLabels.push_back(i);


			// convert set to vector
			{
				vector<nodeLabel_t>* newVec = new vector<nodeLabel_t>();
				set<nodeLabel_t>* targetSet = this->neighborNodeLabelsByNodeLabel[i];
				set<nodeLabel_t>::iterator it = targetSet->begin();
				while (it != targetSet->end())
				{
					if (this->nodeLabelCount[*it] >= freq)
					{
						newVec->push_back(*it);
						++it;
					}
					else {
						set<nodeLabel_t>::iterator temp = it;
						++it;
						targetSet->erase(temp);
					}
				}
				for (uint j = 1; j < newVec->size(); j++)
				{
					while (j > 0 && this->nodeLabelCount[(*newVec)[j - 1]] > this->nodeLabelCount[(*newVec)[j]])
					{
						nodeLabel_t temp = (*newVec)[j - 1];
						(*newVec)[j - 1] = (*newVec)[j];
						(*newVec)[j] = temp;
						--j;
					}

#ifdef DEBUG
					for (uint k = 0; k < j; k++)
					{
						DP(this->nodeLabelCount[(*newVec)[k]] >= this->freq);
						DP(this->nodeLabelCount[(*newVec)[k + 1]] >= this->freq);
						DP(this->nodeLabelCount[(*newVec)[k]] <= this->nodeLabelCount[(*newVec)[k + 1]]);
					}
#endif // DEBUG

				}



				this->orderedNeighborNodeLabelsByNodeLabel[i] = newVec;
			}

			{

				vector<edgeLabel_t>* newVec2 = new vector<edgeLabel_t>();
				set<edgeLabel_t>* targetSet2 = this->connectEdgeLabelsByNodeLabel[i];
				set<edgeLabel_t>::iterator it = targetSet2->begin();
				while (it != targetSet2->end())
				{
					if (this->edgeLabelCount[*it] >= this->freq)
					{
						newVec2->push_back(*it);
						++it;
					}
					else {
						set<edgeLabel_t>::iterator temp = it;
						++it;
						targetSet2->erase(temp);
					}

				}

				for (uint j = 1; j < newVec2->size(); j++)
				{
					while (j > 0 && this->edgeLabelCount[(*newVec2)[j - 1]] > this->edgeLabelCount[(*newVec2)[j]])
					{
						edgeLabel_t temp = (*newVec2)[j - 1];
						(*newVec2)[j - 1] = (*newVec2)[j];
						(*newVec2)[j] = temp;
						--j;
					}

#ifdef DEBUG
					for (uint k = 0; k < j; k++)
					{
						DP(this->edgeLabelCount[(*newVec2)[k]] >= this->freq);
						DP(this->edgeLabelCount[(*newVec2)[k + 1]] >= this->freq);
						DP(this->edgeLabelCount[(*newVec2)[k]] <= this->edgeLabelCount[(*newVec2)[k + 1]]);
					}
#endif // DEBUG


				}

				this->orderedConnectedEdgeLabelsByNodeLabel[i] = newVec2;
			}



		}
		else {
			map<nodeLabel_t, set<nodeLabel_t>*>::iterator it = this->neighborNodeLabelsByNodeLabel.find(i);
			it->second->clear();
			delete it->second;
			this->neighborNodeLabelsByNodeLabel.erase(it);

			map<nodeLabel_t, set<edgeLabel_t>*>::iterator it2 = this->connectEdgeLabelsByNodeLabel.find(i);
			it2->second->clear();
			delete it2->second;
			this->connectEdgeLabelsByNodeLabel.erase(it2);

		}
	}

	for (uint i = 1; i < orderedFrequentNodeLabels.size(); i++)
	{
		int j = i;
		while (j - 1 >= 0 &&
			(nodeLabelCount[orderedFrequentNodeLabels[j - 1]] > nodeLabelCount[orderedFrequentNodeLabels[j]]))
		{
			nodeLabel_t temp = orderedFrequentNodeLabels[j - 1];
			orderedFrequentNodeLabels[j - 1] = orderedFrequentNodeLabels[j];
			orderedFrequentNodeLabels[j] = temp;
			--j;
		}

#ifdef DEBUG
		for (uint j = 0; j < i; j++)
		{
			DP(nodeLabelCount[orderedFrequentNodeLabels[j]] <=
				nodeLabelCount[orderedFrequentNodeLabels[j + 1]]);
		}
#endif // DEBUG

	}

	for (uint i = 0; i < edgeLabelCount.size(); i++)
	{
		if (edgeLabelCount[i] >= freq)
		{
			this->orderedFrequentEdgeLabels.push_back(i);
		}
	}

	for (uint i = 1; i < orderedFrequentEdgeLabels.size(); i++)
	{
		int j = i;
		while (j - 1 >= 0 && edgeLabelCount[orderedFrequentEdgeLabels[j - 1]] > edgeLabelCount[orderedFrequentEdgeLabels[j]])
		{
			edgeLabel_t temp = orderedFrequentEdgeLabels[j - 1];
			orderedFrequentEdgeLabels[j - 1] = orderedFrequentEdgeLabels[j];
			orderedFrequentEdgeLabels[j] = temp;
			--j;
		}

#ifdef DEBUG
		for (uint j = 0; j < i; j++)
		{
			DP(edgeLabelCount[orderedFrequentEdgeLabels[j]] <= edgeLabelCount[orderedFrequentEdgeLabels[j + 1]]);
		}
#endif // DEBUG

	}


}

void Grami::CoreAlgo::setFrequency(const uint f)
{
	this->freq = f;
}

vector<Grami::Pattern*>* Grami::CoreAlgo::patternGrowth(vector<Pattern*>* src)
{
	vector<Grami::Pattern*>* ret = new vector<Grami::Pattern*>();
#ifdef DEBUG
	for (uint i = 0; i < src->size(); i++)
	{
		string s = (src->at(i))->toString();
		cout << s << endl;
		cout << "frequency:" << src->at(i)->getFreq() << endl;
	}
#endif // DEBUG

	for (uint i = 0; i < src->size(); i++)
	{
		Pattern* srcPattern = (*src)[i];

#ifdef DEBUGLOG
		cout << "grow pattern:" << srcPattern->toString() << endl;
#endif // DEBUGLOG


		ushort growNodeIdx = srcPattern->getGrowNodeIdx();
		nodeLabel_t growNodeLabel = srcPattern->getLabelofIthNode(growNodeIdx);

		vector<edgeLabel_t>* freqEdgeLabelByNodeLabel =
			this->orderedConnectedEdgeLabelsByNodeLabel[growNodeLabel];


		// add a single edge only
		//if (srcPattern->isGrownBySelfEdge() == false) 
		{

			for (uint e = 0; e < freqEdgeLabelByNodeLabel->size(); e++)
			{
				Pattern* newPattern = new Pattern(srcPattern);
				newPattern->setGrowNodeIdx(growNodeIdx);
				newPattern->insertEdge(growNodeIdx, growNodeIdx, (*freqEdgeLabelByNodeLabel)[e]);
				if (newPattern->isCanonical() == false)
				{
					newPattern->canonicalize();
				}
				if (Pattern::testedPatterns.find(newPattern) == Pattern::testedPatterns.end())
				{
					newPattern->calcFreq();
					if (newPattern->getFreq() >= this->freq)
					{
						ret->push_back(newPattern);
					}
					else {
						delete newPattern;
					}
				}
			}
		}

		// add a vertex and an edge

		vector<nodeLabel_t>* freqNodeLabelByNodeLabel =
			this->orderedNeighborNodeLabelsByNodeLabel[growNodeLabel];

		for (uint n = 0; n < freqNodeLabelByNodeLabel->size(); n++)
		{
			nodeLabel_t destNodeLabel = (*freqNodeLabelByNodeLabel)[n];
			set<edgeLabel_t>* targetSet = this->connectEdgeLabelsByNodeLabel[destNodeLabel];

			for (uint e = 0; e < freqEdgeLabelByNodeLabel->size(); e++)
			{
				if (targetSet->find((*freqEdgeLabelByNodeLabel)[e]) == targetSet->end())
				{
					continue;
				}
				Pattern* newPattern = new Pattern(srcPattern);
				newPattern->insertNodeLabel(destNodeLabel);
				ushort insertedNodeIdx = newPattern->getNumOfNodes() - 1;
				newPattern->setGrowNodeIdx(insertedNodeIdx);
				newPattern->insertEdge(growNodeIdx, insertedNodeIdx, (*freqEdgeLabelByNodeLabel)[e]);
				if (newPattern->isCanonical() == false)
				{
					newPattern->canonicalize();
				}
				if (Pattern::testedPatterns.find(newPattern) == Pattern::testedPatterns.end())
				{
					newPattern->calcFreq();
					if (newPattern->getFreq() >= this->freq)
					{
						ret->push_back(newPattern);
					}
					else {
						delete newPattern;
					}
				}
			}
		}

		if (srcPattern->isSeed() == true && srcPattern->getGrowNodeIdx() > 0)
		{
			srcPattern->setGrowNodeIdx(0);
			--i;
		}

	}

	return ret;
}

vector<Grami::Pattern*>* Grami::CoreAlgo::generateSeed()
{
	vector<Pattern*>* ret = new vector<Pattern*>();

	vector<Node*> nodes = this->graph->getNodes();

	for (uint i = 0; i < nodes.size(); i++)
	{
		Node* thisNode = nodes.at(i);
		if (thisNode == nullptr)
		{
			continue;
		}
		if (this->isFrequentNodeLabel(thisNode->getLabel()) == false)
		{
			continue;
		}

		for (uint j = 0; j < thisNode->getEdgeCount(); j++)
		{
			updateCounter();

			bool bAnotherNode = true; // self edge 
			pair<edgeLabel_t, Node*> thispair = thisNode->getEdge(j);
			if (this->isFrequentEdgeLabel(thispair.first) == false)
			{
				continue;
			}
			if (thisNode->getNodeID() > thispair.second->getNodeID() ||
				this->isFrequentNodeLabel(thispair.second->getLabel()) == false)
			{
				continue;
			}
			else if (thisNode->getNodeID() == thispair.second->getNodeID())
			{
				bAnotherNode = false;
			}
			// 최적화 -> remove self edge
			Pattern* newPattern = new Pattern();
			Node* firstNode = nullptr;
			Node* secondNode = nullptr;

			if (bAnotherNode)
			{

				firstNode = thisNode;
				secondNode = thispair.second;

				if (firstNode->getLabel() > secondNode->getLabel())
				{
					firstNode = thispair.second;
					secondNode = thisNode;
				}
				newPattern->insertNodeLabel(firstNode->getLabel());
				newPattern->insertNodeLabel(secondNode->getLabel());

				newPattern->insertEdge(0, 1, thispair.first);
			}
			else {
				newPattern->insertNodeLabel(thisNode->getLabel());
				newPattern->insertEdge(0, 0, thispair.first);
			}


			DP(newPattern->isCanonical() == true);

			map<Grami::Pattern*, pair<uint, Grami::Pattern*>, Grami::cmpForPattern>::iterator it = Pattern::testedPatterns.find(newPattern);
			if (it == Pattern::testedPatterns.end())
			{
				Pattern::testedPatterns[newPattern] = pair<uint, Pattern*>(0, newPattern);
				Pattern::testedPatterns.find(newPattern);
				it = Pattern::testedPatterns.find(newPattern);
			}
			it->second.first += 1;
			newPattern = it->second.second;


			if (bAnotherNode)
			{
				DP(newPattern->getNumOfNodes() == 2);
				newPattern->write(firstNode->getNodeID());
				newPattern->write(secondNode->getNodeID());
				newPattern->incNumOfInstances();
			}
			else {
				DP(newPattern->getNumOfNodes() == 1);
				newPattern->write(thisNode->getNodeID());
				newPattern->incNumOfInstances();

			}
		}
	}

	for (map<Pattern*, pair<uint, Pattern*>, cmpForPattern>::iterator it = Pattern::testedPatterns.begin();
		it != Pattern::testedPatterns.end();
		++it)
	{

		Pattern* thisPattern = it->second.second;
		uint calcFreq = it->second.first;
		DP(thisPattern->getNumOfInstances() == calcFreq);
#ifdef DEBUG_
		cout << thisPattern->toString() << endl;
#endif // DEBUG


		if (calcFreq >= freq)
		{
			thisPattern->setFreq(calcFreq);
			ret->push_back(thisPattern);
			thisPattern->setSeed(true); // this pattern is generated by a seed pattern
			ushort numOfNodes = thisPattern->getNumOfNodes();
			thisPattern->setGrowNodeIdx(numOfNodes - 1);
		}
	}
	return ret;
}

bool Grami::CoreAlgo::isFrequentNodeLabel(nodeLabel_t l) const
{
	return (this->nodeLabelCount[l] >= this->freq);
}

bool Grami::CoreAlgo::isFrequentEdgeLabel(nodeLabel_t l) const
{
	return (this->edgeLabelCount[l] >= this->freq);
}



