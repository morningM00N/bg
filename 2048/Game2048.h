#pragma once
#include "Definitions.h"
#include "State.h"
#include <stdio.h>
#include <iostream>
#include <conio.h>	

using namespace std;
class Game2048
{
public:
	State curState;
	void init() {
		curState.generateTile();
	}
	void playGame() {
		char ch;
		char moves[4] = { 'w','a','s','d' };
		while (true) {
			cout << endl;
			curState.show();
			cout << endl;
			if (curState.isFinished() == true) {
				cout << "game over" << endl;
				return;
			}
			ch = moves[rand() % 4];
			bool moved = false;
			switch (ch)
			{
			case 'w':
				if (curState.isMovable(DIRECTION::UP) == true) {
					board_t nextBoard = curState.move(DIRECTION::UP);
					moved = true;

					curState.board = nextBoard;
				}
				
				break;
			case 'a':
				if (curState.isMovable(DIRECTION::LEFT) == true) {
					board_t nextBoard = curState.move(DIRECTION::LEFT);
					moved = true;

					curState.board = nextBoard;
				}
				
				break;
			case 's':
				if (curState.isMovable(DIRECTION::DOWN) == true) {
					board_t nextBoard = curState.move(DIRECTION::DOWN);
					moved = true;

					curState.board = nextBoard;
				}
				
				break;
			case 'd':
				if (curState.isMovable(DIRECTION::RIGHT) == true) {
					board_t nextBoard = curState.move(DIRECTION::RIGHT);
					moved = true;

					curState.board = nextBoard;
				}
				
				break;
			case 'q':
				return;
				break;
			default:
				cout << "cannot move" << endl;
				break;
			}
			if (moved) {
				curState.generateTile();
			}
			else {
				cout << "cannot move" << endl;
			}
			
			

		}
	}
};

