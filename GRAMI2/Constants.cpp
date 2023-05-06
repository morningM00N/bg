#include "Constants.h"
#include <assert.h>

#ifdef DEBUG

int checkCounter = 0;

void updateCounter(int v)
{
	if (v != 0) {
		int a = 3;
	}

	++checkCounter;
	int a = 3;
}

void DP(bool b)
{
	if (b==false){
		assert(false);
	}
}
#endif
