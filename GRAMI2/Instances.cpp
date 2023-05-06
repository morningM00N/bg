#include "Instances.h"
#include <string.h>

void Grami::Instances::doubling()
{
	this->sizeOfStorage <<= 1;
	char* newStorage = new char[this->sizeOfStorage];


	memcpy(newStorage, this->storage, sizeof(char) * (this->sizeOfStorage>>1));

	memset(&newStorage[(this->sizeOfStorage >> 1)], 0, (this->sizeOfStorage>>1));

	delete[] this->storage;
	this->storage = newStorage;
}

void Grami::Instances::incNumOfNodes()
{
	++this->numOfNodes;
}

void Grami::Instances::setNumOfNodes(uint n)
{
	this->numOfNodes = n;
}

void Grami::Instances::incNumOfInstances()
{
	++this->numOfInstances;
#ifdef DEBUG
	this->nodeIdx = 0;
#endif // DEBUG

}

nodeID_t Grami::Instances::getIDofIthNodeForJthInstance(uint i, uint j) const
{
	uint tempBitLoc = Grami::Instances::nodeIDBitSize * (j * this->numOfNodes + i);
	uint loc = (tempBitLoc >> 3); // tempBitLoc / 8;
	uint shift = tempBitLoc & 0b111; // tempBitLoc % 8;
	unsigned long long int* p = (unsigned long long int*)&this->storage[loc];
	nodeID_t ret = ((nodeID_t)((*p) >> shift) & Grami::Instances::MASK);
#ifdef DEBUG
	DP(ret == this->stor_vec[i + this->numOfNodes*j]);
#endif // DEBUG

	
	return ret;
}

void Grami::Instances::write(nodeID_t id)
{
	updateCounter();
	if (this->bitLoc + Grami::Instances::nodeIDBitSize >= this->sizeOfStorage * 8) {
		this->doubling();
	}
	uint loc = (this->bitLoc >> 3); // this->bitLoc / 8;
	uint shift = this->bitLoc & 0b111; // this->bitLoc % 8;
	unsigned long long int* p = (unsigned long long int*)&this->storage[loc];
	unsigned long long int v = (id << shift);
	*p |= v;
	this->bitLoc += Grami::Instances::nodeIDBitSize;

#ifdef DEBUG
	this->stor_vec.push_back(id);
	nodeID_t id2 = this->getIDofIthNodeForJthInstance(this->nodeIdx , this->numOfInstances);
	DP(id == id2);
	this->nodeIdx++;
	
#endif // DEBUG

}

Grami::Instances & Grami::Instances::operator=(const Instances & other)
{
	DP(false);
	return *this;
}

Grami::Instances::Instances()
{
	this->sizeOfStorage = Grami::Instances::nodeIDBitSize * 256;
	this->storage = new char[this->sizeOfStorage];
	memset(this->storage, 0, this->sizeOfStorage);
	
	this->bitLoc = 0;
}

Grami::Instances::~Instances()
{
	delete[] this->storage;
}

uint Grami::Instances::getNumOfInstances() const
{
	return this->numOfInstances;
}
