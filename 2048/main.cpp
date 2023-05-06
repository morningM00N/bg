#include <iostream>
#include "Game2048.h"
#include "State.h"
#include "Definitions.h"
#include <time.h>
using namespace std;

int State::size = 4;
row_t State::movedLeft[(1 << 16)];
row_t State::movedRight[(1 << 16)];
bool State::hasZero[(1 << 16)];

int main() {
	srand((unsigned int)time(NULL));
	int seed = rand() % 10000000;
	srand(seed);
	SHOW(seed);
	State::preCalculate();
	Game2048 g;
	g.init();
	g.playGame();
	return 0;
}
