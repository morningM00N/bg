#include "Instances.h"
#include <string.h>

void Grami::Instances::doubling()
{
	this->sizeOfStorage <<= 1;
	char* newStorage = new char[this->sizeOfStorage];

	memcpy(newStorage, this->storage, sizeof(char) * (this->sizeOfStorage>>1));
	delete[] this->storage;
	this->storage = newStorage;
}
