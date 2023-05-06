#include "Graph.h"
#include "Pattern.h"
#include <fstream>
#include <string>
#include <sstream>
#include <iostream>

std::map<Grami::Pattern*, std::pair<uint,Grami::Pattern*>, Grami::cmpForPattern> Grami::Pattern::testedPatterns;

void Grami::Graph::insertNode(Node* n)
{
	if (n->getLabel() > this->maxNodeLabel) {
		this->maxNodeLabel = n->getLabel();
	}
	this->nodes.push_back(n);
}

void Grami::Graph::insertEdge(Node* src, Node* dest, edgeLabel_t e)
{
	DP(src->getNodeID() < this->nodes.size());
	DP(dest->getNodeID() < this->nodes.size());
	src->addEdge(dest, e);
	dest->addEdge(src, e);

	if (e > this->maxEdgeLabel) {
		this->maxEdgeLabel = e;
	}
}

std::vector<Grami::Node*>& Grami::Graph::getNodes()
{
	return this->nodes;
}

Grami::Node* Grami::Graph::getNode(nodeID_t id)
{
	return this->nodes.at(id);
}


Grami::Graph::Graph() : nodes(std::vector<Node*>(INITIAL_SIZE, nullptr))
{
}

Grami::Graph::~Graph()
{
}

void Grami::Graph::readFromFile(const char* filepath)
{
	std::ifstream ifs(filepath);
	std::string line;
	while (std::getline(ifs, line)) {
		std::istringstream iss(line);
		std::string word;
		iss >> word;
		if (word == "v") { // vertex
			iss >> word;
			nodeID_t id = std::stoi(word);
			iss >> word;
			nodeLabel_t label = std::stoi(word);
			Node* newNode = new Node();
			newNode->setLabel(label);
			newNode->setNodeId(id);
			if (this->nodes.size() <= id) {
				this->nodes.resize(MAX(((this->nodes.size())<<1),id + 1), nullptr);
			}

			if (this->maxNodeLabel < label) {
				this->maxNodeLabel = label;
			}

			this->nodes[id] = newNode;
		}
		else {
			DP(word == "e");
			iss >> word;
			nodeID_t src = std::stoi(word);
			DP(src < this->nodes.size());

			Node* srcNode = this->nodes.at(src);
			DP(srcNode != nullptr);

			iss >> word;
			nodeID_t dest = std::stoi(word);
			DP(dest < this->nodes.size());

			Node* destNode = this->nodes.at(dest);
			DP(destNode != nullptr);

			iss >> word;
			edgeLabel_t label = std::stoi(word);

			srcNode->addEdge(destNode, label);
			if (srcNode != destNode) {
				destNode->addEdge(srcNode, label);
			}

			if (this->maxEdgeLabel< label) {
				this->maxEdgeLabel = label;
			}



		}
	}
	ifs.close();
}

nodeLabel_t Grami::Graph::getMaxNodeLabel() const
{
	return this->maxNodeLabel;
}

edgeLabel_t Grami::Graph::getMaxEdgeLabel() const
{
	return this->maxEdgeLabel;
}




