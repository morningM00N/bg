#include <iostream>
#include "Instances.h"
#include "Graph.h"
#include "Pattern.h"
#include "CoreAlgo.h"
#include <set>
using namespace std;
using namespace Grami;

uint Instances::nodeIDBitSize = 14;
uint Instances::MASK= 0b11111111111111;
Graph* Pattern::graph = nullptr;
int main() {
	Graph g;
	g.readFromFile("input.txt");
	Pattern::graph = &g;
	

	CoreAlgo algo;
	algo.setFrequency(3);
	algo.getFrequentPatterns(g);


	return 0;
}
