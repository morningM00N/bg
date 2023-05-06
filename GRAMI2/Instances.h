#ifndef __INSTANCES_H__
#define __INSTANCES_H__
#include "Constants.h"
#include <vector>

namespace Grami {
	class Instances
	{
	private:
		char* storage;
		uint sizeOfStorage;
		void doubling();
		uint numOfNodes;
		uint numOfInstances;
		uint bitLoc;
#ifdef DEBUG
		std::vector<uint> stor_vec;
		uint nodeIdx = 0;
#endif
	public:
		void incNumOfNodes();
		void setNumOfNodes(uint n);
		void incNumOfInstances();
		static uint nodeIDBitSize;
		static uint MASK;
		nodeID_t getIDofIthNodeForJthInstance(uint i, uint j) const;
		void write(nodeID_t id);
		Instances& operator=(const Instances& other);
		Instances();
		~Instances();
		uint getNumOfInstances() const;
	};
}
#endif

