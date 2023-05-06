#ifndef __INSTANCES_H__
#define __INSTANCES_H__
#include "Constants.h"

namespace Grami {
	class Instances
	{
		char* storage;
		uint sizeOfStorage;
		void doubling();
	public:
		static int nodeBitSize;

	};
}
#endif

