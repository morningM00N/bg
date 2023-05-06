#pragma once
#include "Definitions.h"
#include "State.h"
class Traversal
{
public:
	DIRECTION moves[4] = { DIRECTION::UP, DIRECTION::DOWN, DIRECTION::LEFT , DIRECTION::RIGHT };
	int thresholdSearchDepth = 10;
	DIRECTION findBestMove(State s) {
		DIRECTION d = DIRECTION::UP;
		double bestScore = 0;
		for (int i = 0; i < 4; i++)
		{
			if (s.isMovable(moves[i]) == true) {
				double score = getScore(s,0);
				if (score > bestScore) {
					bestScore = score;
					d = moves[i];
				}
			}
		}
		return d;
	}
	double calculateState(State s) {
		return 0.0;
	}
	double getScore(State s, int depth) {
		if (depth > thresholdSearchDepth) {
			return calculateState(s);
		}
	}
};

