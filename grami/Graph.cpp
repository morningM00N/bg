#include "Graph.h"

std::vector<Grami::Node*>& Grami::Graph::getNodes()
{
	return this->nodes;
}

std::vector<uint>* Grami::Graph::getNodesByType(ushort type)
{
	return this->nodesByTypes[type];
}
