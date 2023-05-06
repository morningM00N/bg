#pragma once
#include "Definitions.h"
#include <stdlib.h>
#include <iostream>

using namespace std;

class State
{
public:
	static int size;
	static row_t movedLeft[(1 << 16)];
	static row_t movedRight[(1 << 16)];
	static bool hasZero[(1 << 16)];

	static board_t transpose(board_t x);

	static row_t reverse(row_t board);

	static void preCalculate();

	static row_t rowFromIntArray(int* arr);

	static void rowToIntArray(row_t row, int* arr);

	static void rowMoveLeft(int* src, int* desc);


	board_t board = 0;

	static void toIntArray(board_t board, int* arr);

	void fromIntArray(int* arr);

	void show() {
		int arr[16];
		this->toIntArray(this->board, arr);
		for (int i = 0; i < 4; i++)
		{
			for (int j = 0; j < 4; j++)
			{
				cout << arr[4 * i + j] << " ";
			}
			cout << endl;
		}
	}

	board_t move(DIRECTION direction);

	bool isMovable(DIRECTION direction);

	void generateTile();

	bool isFinished();
};

