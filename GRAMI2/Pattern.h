#ifndef __PATTERN_H__
#define __PATTERN_H__
#include <vector>
#include <map>
#include <set>
#include "Graph.h"
#include "Constants.h"
#include "Instances.h"


namespace Grami {
	class Pattern;

	struct cmpForPattern {
		bool operator()(Pattern* a, Pattern* b) const;
	};



	class Pattern
	{
	private:
		
		ushort lastAddedNodeIdx; // growth from this node
		
		bool extended = false; // true if its descendant pattern is frequent
		bool seed = false; // true if this is an seed pattern
		
		std::vector<nodeLabel_t>* nodeLabels = nullptr; // node labels consisting of this pattern [3,2,3] -> 1st node's label=3, 2nd node's label=2
		// canonical -> nodeLabels[1]<=nodeLabels[2] 
		// canonical -> nodeLabels[1]==nodeLabels[2] -> prevConnectedNodeIdxs[1]==nullptr & prevConnectedNodeIdxs[2]!=nullptr
		// canonical -> nodeLabels[1]==nodeLabels[2] -> prevConnectedNodeIdxs[1][0] <= prevConnectedNodeIdxs[2][0]
		std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>* edgeTypes; // edge types consisting of this pattern edgeTypes[{1,3}]=7 -> the 1st and 3rd nodes are connected by edge whose label is 7

		uint frequence = 0xffffffff; // frequence = 0xffffffff --> not computed yet
		Pattern* parentPattern; // this pattern is generated from parentPattern --> parentPattern +1 edge (+1 vertex) = this pattern

		Instances* instances;

		//std::map<ushort, std::multiset<ushort>*> prevConnectedNodeIdxs;
		//std::map<ushort, std::multiset<ushort>*> nextConnectedNodeIdxs;

		edgeLabel_t newEdgeLabel; // inserted edge information
		nodeLabel_t srcNodeLabel; // inserted edge information
		nodeLabel_t destNodeLabel; // inserted edge information
		ushort srcNodeIdxInParentInstances; // inserted edge information
		ushort destNodeIdxInParentInstances; // inserted edge information



		void copyEdgesFromParent(std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>* parent);

		int nodeIDXPriorityCompare(ushort idx1, ushort idx2); // used in isCanonical() -1 if idx1>idx2, 0 if idx1==idx2, 1 if idx < idx2 
		void swapNodeLoc(ushort idx1, ushort idx2, std::vector<ushort>& originalLoc);

	public:

		Pattern(Pattern* parentPattern = nullptr);
		~Pattern();

		std::string toString(bool withParent=false) const; 

		void setFreq(uint freq);
		uint getFreq() const; // get the frequency of this pattern


		void setGrowNodeIdx(ushort idx);
		ushort getGrowNodeIdx() const;
		
		bool isGrownByInnerEdge() const;
		static std::map<Pattern*, std::pair<uint,Pattern*>, cmpForPattern> testedPatterns;
		static Graph* graph; // whole graph
		void calcFreq(); // calculate the frequency of this pattern
		bool isFreqComputed() const; // true if the frequency of this pattern is computed
		uint getNumOfNodes() const;
		uint getNumOfEdges() const;
		nodeID_t getIDofIthNodeForJthInstance(uint i, uint j) const;
		bool isExtended() const;

		bool isCanonical() ;
		void canonicalize();
		
		nodeLabel_t getLabelofIthNode(uint i) const;
		std::map<std::pair<ushort, ushort>, std::set<edgeLabel_t>*>* getEdgeTypes();
		void insertNodeLabel(nodeLabel_t l);
		void insertEdge(ushort idx1, ushort idx2, edgeLabel_t e);
		void write(nodeID_t id); 
		void incNumOfInstances();
		uint getNumOfInstances() const;


		void setSeed(bool b);
		bool isSeed() const;

		void clearInstances();
		Instances* getInstances() const;

		void show() const;
	};
}
#endif

