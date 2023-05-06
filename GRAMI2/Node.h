#ifndef __NODE_H__
#define __NODE_H__
#include <map>
#include <vector>
#include <set>
#include "Constants.h"

namespace Grami {
	class Node
	{
		uint raw; // nodeID<<10 + label 
#ifdef DEBUG
		nodeID_t nodeId;
		nodeLabel_t label;
#endif
		std::map<edgeLabel_t, std::set<Node*>*> connectedNodesbyEdgeLabel; // connectedNodesbyEdgeLabel[edgeLabel] = [connectedNodeID1,connectedNodeID2,...]
		std::map<Node*, std::set<edgeLabel_t>*> connectedEdgesbyNodeID; // connectedEdgesbyNodeID[nodeID] = [edgeLabel1,edgeLabel2,...]
		std::set<Node*> neighborhoods; // IDs of nodes connecting this node
		std::vector<std::pair<edgeLabel_t, Node*>> edges;

	public:
		void setNodeId(nodeID_t id);
		void setLabel(nodeLabel_t label);
		void addEdge(Node* dest, edgeLabel_t edgeLabel);

		nodeID_t getNodeID() const;
		nodeLabel_t getLabel() const;
		std::set<Node*>* getNodesIdByEdge(edgeLabel_t edgeLabel); // get node id connected by edgeLabel
		std::pair<edgeLabel_t, Node*> getEdge(uint idx) const;
		uint getEdgeCount() const;
		Node();
		~Node();
	};
#endif
}
