#ifndef __PATTERN_H__
#define __PATTERN_H__
#include <vector>
#include <map>
#include "Graph.h"
#include "Constants.h"
#include "Instances.h"

namespace Grami {
	class Pattern
	{
	private:
		static Graph& graph; // whole graph
		std::vector<uint> nodeIDs; // node ids consisting of this pattern
		std::map<std::pair<uint, uint>, ushort> edgeTypes; // edge types consisting of this pattern edgeTypes[{1,3}]=7 -> vertexID1 -edgeType7- vertexID3
		uint frequence = 0xffffffff; // frequence = 0xffffffff --> not computed yet
		Pattern* parentPattern; // this pattern is generated from parentPattern --> parentPattern +1 edge (+1 vertex) = this pattern
		ushort idxOfNewNodeId = 0xffff; // the inserted node from parentPattern
		std::pair<uint, uint> newEdge; // the inserted edge from parentPattern (currentNode - newNode)
	public:
		static void setGraph(const Graph& g);
		void calcFrequent(); // calculate the frequency of this pattern
		int getFrequent() const; // get the frequency of this pattern
		bool isFrequencyComputed() const; // true if the frequency of this pattern is computed
		uint getNumOfNodes() const;
		uint getVertexIDofInstance(uint instanceOrder, uint nodeOrder) const; // get the nodeOrder-th node ID of the instanceOrder-th instance
	};
}
#endif

