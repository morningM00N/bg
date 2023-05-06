#include "Pattern.h"
#include <set>

void Grami::Pattern::setGraph(const Graph & g)
{
	Grami::Pattern::graph = g;
}

void Grami::Pattern::calcFrequent()
{
	
	uint numOfNodesInParentPattern = this->parentPattern->getNumOfNodes();
	uint* pVertexIDs = new uint[numOfNodesInParentPattern];
	uint numOfFrequence = 0;

	uint srcNodeLabel; // label of the added src node
	uint descNodeLabel; // label of the added desc node
	ushort edgeLabel; // label of the added edge

	for (int i = 0; i < this->parentPattern->getFrequent(); i++)
	{ 
		// procetss the i-th instance
		for (uint j = 0; j < numOfNodesInParentPattern; j++)
		{
			pVertexIDs[j] = this->parentPattern->getVertexIDofInstance(i, j);
		}

		
		Node* srcNode; // src Node (of the i-th instance) of the added edge
		DP(srcNode->getLabel() == srcNodeLabel);
		
		std::set<Node*>* descNodes = srcNode->getNodesIdByEdge(edgeLabel); //

		// new edge connected to a node in this pattern
		Node* descNode; // desc Node (of the i-th instance) of the added edge
		if (descNodes->find(descNode) != descNodes->end()) {

		}

		// new edge connected to not a node in this pattern
		

		






	}


	this->frequence = numOfFrequence;

	delete[] pVertexIDs;
}


int Grami::Pattern::getFrequent() const
{
	DP(this->isFrequencyComputed() == true);
	return this->frequence;
}

bool Grami::Pattern::isFrequencyComputed() const
{
	return (this->frequence != 0xffffffff);
}

uint Grami::Pattern::getNumOfNodes() const
{
	return this->nodeIDs.size();
}
