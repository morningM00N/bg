#ifndef __GRAPH_H__
#define __GRAPH_H__

#include "Constants.h"
#include "Node.h"
#include <vector>

namespace Grami {
	class Pattern;
	class Graph
	{
	private:
		std::vector<nodeLabel_t> nodeLabels; // array which stores node labels according to their frequency
		std::vector<edgeLabel_t> edgeLabels;
		std::vector<Node*> nodes; // nodes[i] stores the node whose node id is i
		

		nodeLabel_t maxNodeLabel = 0;
		edgeLabel_t maxEdgeLabel = 0;


	public:
		Graph();
		~Graph();

		void insertNode(Node*);
		void insertEdge(Node* src, Node* dest, edgeLabel_t e);

		std::vector<Node*>& getNodes();
		Node* getNode(nodeID_t id); // get the node whose id is i
		
		void readFromFile(const char* filepath);

		nodeLabel_t getMaxNodeLabel() const;
		edgeLabel_t getMaxEdgeLabel() const;

	};
}

#endif
