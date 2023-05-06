#ifndef __NODE_H__
#define __NODE_H__
#include <map>
#include <vector>
#include <set>
#include "Constants.h"
class Edge;

namespace Grami {
	class Node
	{
		uint raw; // nodeID<<10 + label 
		//uint nodeId;
		//uint label;
		std::map<uint, std::vector<uint>*> connectedNodes; // nodeid, edgeLabel

	public:
		void setNodeId(uint id);
		void setLabel(uint label);
		int getNodeID() const;
		int getLabel() const;
		void addNode(uint nodeid, uint edgeLabel);
		std::set<Node*>* getNodesIdByEdge(ushort edgeLabel) const; // get node id connected by edgeLabel
		Node();
		~Node();
	};
#endif
}
