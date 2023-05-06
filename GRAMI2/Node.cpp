#include "Node.h"

void Grami::Node::setNodeId(nodeID_t id)
{
	DP(id < (1 << 22));
#ifdef DEBUG
	this->nodeId = id;
#endif // DEBUG

	this->raw = (this->raw & 0x3ff);
	this->raw = (this->raw | (id << 10));
}

void Grami::Node::setLabel(nodeLabel_t label)
{
#ifdef DEBUG
	this->label= label;
#endif
	DP(label < (1 << 10));
	this->raw = (this->raw & (0xfffffc00));
	this->raw |= label;
}

nodeID_t Grami::Node::getNodeID() const
{
	return (this->raw >> 10);
}

nodeLabel_t Grami::Node::getLabel() const
{
	return (this->raw & (0x3ff));
}

void Grami::Node::addEdge(Node* dest, edgeLabel_t edgeLabel)
{
	this->edges.push_back(std::pair<edgeLabel_t,Node*>(edgeLabel, dest));

	if (this->neighborhoods.find(dest) == this->neighborhoods.end()) {
		this->neighborhoods.insert(dest);
	}

	if (this->connectedEdgesbyNodeID.find(dest) == this->connectedEdgesbyNodeID.end()) {
		std::set<edgeLabel_t>* val = new std::set<edgeLabel_t>();
		this->connectedEdgesbyNodeID[dest] = val;
	}
	this->connectedEdgesbyNodeID[dest]->insert(edgeLabel);

	if (this->connectedNodesbyEdgeLabel.find(edgeLabel) == this->connectedNodesbyEdgeLabel.end()) {
		std::set<Node* >* val = new std::set<Node* >();
		this->connectedNodesbyEdgeLabel[edgeLabel] = val;
	}
	this->connectedNodesbyEdgeLabel[edgeLabel]->insert(dest);
}


std::set<Grami::Node*>* Grami::Node::getNodesIdByEdge(edgeLabel_t edgeLabel) 
{
	std::map<edgeLabel_t, std::set<Node*>*>::iterator it = this->connectedNodesbyEdgeLabel.find(edgeLabel);
	if (it == this->connectedNodesbyEdgeLabel.end()) {
		return nullptr;
	}
	return it->second;
}

std::pair<edgeLabel_t, Grami::Node*> Grami::Node::getEdge(uint idx) const
{
	return this->edges.at(idx);
}

uint Grami::Node::getEdgeCount() const
{
	return this->edges.size();
}


Grami::Node::Node()
{
}

Grami::Node::~Node()
{
	for (std::map<edgeLabel_t, std::set<Node*>*>::iterator it = connectedNodesbyEdgeLabel.begin();
		it != connectedNodesbyEdgeLabel.end();
		++it) {
		std::set<Node*>* val = it->second;
		delete val;
	}

	for (std::map<Node*, std::set<edgeLabel_t>*>::iterator it = connectedEdgesbyNodeID.begin();
		it != connectedEdgesbyNodeID.end();
		++it) {
		std::set<edgeLabel_t>* val = it->second;
		delete val;
	}
}
