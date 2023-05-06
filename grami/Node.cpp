#include "Node.h"

void Grami::Node::setNodeId(uint id)
{
	DP(id < (1 << 22));
	this->raw = (this->raw & 0x3ff);
	this->raw = (this->raw | (id << 10));
}

void Grami::Node::setLabel(uint label)
{
	DP(label < (1 << 10));
	this->raw = (this->raw & (0xfffffc00));
	this->raw |= label;
}

int Grami::Node::getNodeID() const
{
	return (this->raw >> 10);
}

int Grami::Node::getLabel() const
{
	return (this->raw & (0x3ff));
}

void Grami::Node::addNode(uint nodeid, uint edgeLabel)
{
	if (this->connectedNodes.find(nodeid) == this->connectedNodes.end()) {
		std::vector<uint>* val = new std::vector<uint>();
		this->connectedNodes[nodeid] = val;
	}
	this->connectedNodes[nodeid]->push_back(edgeLabel);
}


Grami::Node::Node()
{
}

Grami::Node::~Node()
{
	for (std::map<uint, std::vector<uint>*>::iterator it = connectedNodes.begin();
		it != connectedNodes.end();
		++it) {
		std::vector<uint>* val = it->second;
		delete val;
	}
}
