#ifndef __COREALGO_H__
#define __COREALGO_H__

#include "Constants.h"
#include "Graph.h"
#include "Pattern.h"
#include <iostream>
#include <vector>

using namespace std;
namespace Grami {
	class CoreAlgo
	{
	private:
		Graph* graph;
		uint freq;

		map<nodeLabel_t, set<nodeLabel_t>*> neighborNodeLabelsByNodeLabel;
		map<nodeLabel_t, set<edgeLabel_t>*> connectEdgeLabelsByNodeLabel;

		vector<uint> nodeLabelCount; // nodeLabelCount[i] = j -> label i's frequent = j
		vector<uint> edgeLabelCount;


		vector<nodeLabel_t> orderedFrequentNodeLabels; // non-decreasing order by frequency
		vector<edgeLabel_t> orderedFrequentEdgeLabels; // non-decreasing order by frequency


		map<nodeLabel_t, vector<nodeLabel_t>*> orderedNeighborNodeLabelsByNodeLabel;
		map<nodeLabel_t, vector<edgeLabel_t>*> orderedConnectedEdgeLabelsByNodeLabel;


	public:
		void removeInfrequentItems(Graph& g);
		vector<Pattern*>* getFrequentPatterns(Graph& g);
		void setFrequency(const uint f);
		vector<Pattern*>* patternGrowth(vector<Pattern*>* src);
		vector<Pattern*>* generateSeed(); // generate frequent patterns consisting of two nodes and a single edge (or a single node with a self edge)
		bool isFrequentNodeLabel(nodeLabel_t) const;
		bool isFrequentEdgeLabel(nodeLabel_t) const;
	};
}
#endif // __COREALGO_H__


