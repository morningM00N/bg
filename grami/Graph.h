#ifndef __GRAPH_H__
#define __GRAPH_H__

#include "Constants.h"
#include "Node.h"
#include <vector>
namespace Grami {
	class Graph
	{
	private:
		std::vector<Node*> nodes;
		std::vector<std::vector<uint>*> nodesByTypes;

	public:
		std::vector<Node*>& getNodes();
		std::vector<uint>* getNodesByType(ushort type);
	};
}

#endif
