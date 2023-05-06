#include "State.h"
#include <math.h>

board_t State::transpose(board_t x)
{
	board_t a1 = x & 0xF0F00F0FF0F00F0FULL;
	board_t a2 = x & 0x0000F0F00000F0F0ULL;
	board_t a3 = x & 0x0F0F00000F0F0000ULL;
	board_t a = a1 | (a2 << 12) | (a3 >> 12);
	board_t b1 = a & 0xFF00FF0000FF00FFULL;
	board_t b2 = a & 0x00FF00FF00000000ULL;
	board_t b3 = a & 0x00000000FF00FF00ULL;
	return b1 | (b2 >> 24) | (b3 << 24);
}

row_t State::reverse(row_t board) {
	return ((board & 0xf) << 12) |
		(((board >> 4) & 0xf) << 8) |
		(((board >> 8) & 0xf) << 4) |
		(((board >> 12) & 0xf));
}

void State::preCalculate() {

	for (int i = 0; i < (1 << 16); i++)
	{
		movedLeft[i] = movedRight[i] = 0;
		hasZero[i] = false;
	}

	int temp[4];
	int temp2[4];
	for (int row = 0; row < (1 << 16); row++)
	{

		rowToIntArray(row, temp);
		DP(rowFromIntArray(temp) == row);
		rowMoveLeft(temp, temp2);

		for (int i = 0; i < 4; i++)
		{
			if (temp[i] == 0) {
				hasZero[row] = true;
			}
		}

		// row = 1122
		row_t movedLeftVal = rowFromIntArray(temp2);
		// movedLeftVal = 2300
		movedLeft[row] = movedLeftVal;

		row_t revBoard = reverse(row);
		// revBoard = 2211
		row_t revMovedLeft = reverse(movedLeftVal);
		// revMovedLeft = 0032
		movedRight[revBoard] = revMovedLeft;
	}

#ifdef DEBUG
	for (board_t board = 1; board < (1 << 16); board++)
	{
		DP(movedLeft[board] != 0);
		DP(movedRight[board] != 0);
	}
#endif // DEBUG

}

row_t State::rowFromIntArray(int * arr) {
	return (
		(arr[0] << 12) |
		(arr[1] << 8) |
		(arr[2] << 4) |
		(arr[3])
		);
}

void State::rowToIntArray(row_t row, int * arr) {
	arr[0] = (row >> 12) & 0xfULL;
	arr[1] = (row >> 8) & 0xfULL;
	arr[2] = (row >> 4) & 0xfULL;
	arr[3] = (row) & 0xfULL;
}

void State::rowMoveLeft(int * src, int * desc) {
	for (int i = 0; i < 4; i++)
	{
		desc[i] = src[i];
	}
	for (int i = 0; i < 3; ++i) {
		int j;
		for (j = i + 1; j < 4; ++j) {
			if (desc[j] != 0) break;
		}
		if (j == 4) return;

		if (desc[i] == 0) {
			desc[i] = desc[j];
			desc[j] = 0;
			i--; // retry
		}
		else if (desc[i] == desc[j]) {
			if (desc[i] != 0xf) {
				desc[i]++;
			}
			desc[j] = 0;
		}
	}
}

void State::toIntArray(board_t board, int * arr) {
	rowToIntArray(((row_t)board), arr + 12);
	rowToIntArray((row_t)(board >> 16), arr + 8);
	rowToIntArray((row_t)(board >> 32), arr + 4);
	rowToIntArray((row_t)(board >> 48), arr);
}

void State::fromIntArray(int * arr) {
	this->board =
		(((board_t)rowFromIntArray(arr)) << 48) |
		(((board_t)rowFromIntArray(arr + 4)) << 32) |
		(((board_t)rowFromIntArray(arr + 8)) << 16) +
		rowFromIntArray(arr + 12);
}

board_t State::move(DIRECTION direction) {
	board_t target = this->board;
	if (direction == DIRECTION::UP || direction == DIRECTION::DOWN) {
		target = transpose(this->board);
	}

	board_t row0 = target >> 48;
	DP(row0 < (1 << 16));
	board_t row1 = (target >> 32) & 0xffffULL;
	board_t row2 = (target >> 16) & 0xffffULL;
	board_t row3 = target & 0xffffULL;

	board_t movedRow0, movedRow1, movedRow2, movedRow3;

	if (direction == DIRECTION::LEFT || direction == DIRECTION::UP) {
		movedRow0 = movedLeft[row0];
		movedRow1 = movedLeft[row1];
		movedRow2 = movedLeft[row2];
		movedRow3 = movedLeft[row3];
	}
	else {
		DP(direction == DIRECTION::RIGHT || direction == DIRECTION::DOWN);
		movedRow0 = movedRight[row0];
		movedRow1 = movedRight[row1];
		movedRow2 = movedRight[row2];
		movedRow3 = movedRight[row3];
	}
	board_t ret =
		(movedRow0 << 48) |
		(movedRow1 << 32) |
		(movedRow2 << 16) |
		(movedRow3);

	if (direction == DIRECTION::UP || direction == DIRECTION::DOWN) {
		ret = transpose(ret);
	}

#ifdef DEBUG

	int prev[16];
	int next[16];
	State::toIntArray(this->board, prev);
	State::toIntArray(ret, next);
	if (direction == DIRECTION::LEFT || direction == DIRECTION::RIGHT) {
		for (int i = 0; i < 4; i++)
		{
			int prevSum = 0;
			int nextSum = 0;
			for (int j = 0; j < 4; j++)
			{
				if (prev[4 * i + j] > 0) {
					prevSum += pow(2, prev[4 * i + j]);
				}
				if (next[4 * i + j] > 0) {
					nextSum += pow(2, next[4 * i + j]);
				}
			}
			DP(prevSum == nextSum);
		}
	}
	if (direction == DIRECTION::UP || direction == DIRECTION::DOWN) {
		for (int i = 0; i < 4; i++)
		{
			int prevSum = 0;
			int nextSum = 0;
			for (int j = 0; j < 4; j++)
			{
				if (prev[4 * j + i] > 0) {
					prevSum += pow(2, prev[4 * j + i]);
				}
				if (next[4 * j + i] > 0) {
					nextSum += pow(2, next[4 * j + i]);
				}
			}
			DP(prevSum == nextSum);
		}
	}

	if (direction == DIRECTION::LEFT) {
		for (int i = 0; i < 4; i++)
		{
			bool zero = false;;
			for (int j = 0; j < 4; j++)
			{
				if (next[4 * i + j] == 0) {
					zero = true;
				}
				else {
					DP(zero == false);
				}
			}
		}
	}

	if (direction == DIRECTION::RIGHT) {
		for (int i = 0; i < 4; i++)
		{
			bool zero = false;;
			for (int j = 0; j < 4; j++)
			{
				if (next[4 * i + (3 - j)] == 0) {
					zero = true;
				}
				else {
					DP(zero == false);
				}
			}
		}
	}

	if (direction == DIRECTION::UP) {
		for (int i = 0; i < 4; i++)
		{
			bool zero = false;;
			for (int j = 0; j < 4; j++)
			{
				if (next[4 * j + i] == 0) {
					zero = true;
				}
				else {
					DP(zero == false);
				}
			}
		}
	}

	if (direction == DIRECTION::DOWN) {
		for (int i = 0; i < 4; i++)
		{
			bool zero = false;;
			for (int j = 0; j < 4; j++)
			{
				if (next[4 * (3 - j) + i] == 0) {
					zero = true;
				}
				else {
					DP(zero == false);
				}
			}
		}
	}

#endif // DEBUG

	return ret;

}

bool State::isMovable(DIRECTION direction) {
	board_t target = this->board;
	if (direction == DIRECTION::UP || direction == DIRECTION::DOWN) {
		target = transpose(this->board);
	}

	for (int r = 0; r < 4; r++)
	{
		board_t row = target & 0xffffULL;
		if (direction == DIRECTION::LEFT || direction == DIRECTION::UP) {
			if (row != movedLeft[row]) {
				return true;
			}
		}
		else {
			DP(direction == DIRECTION::RIGHT || direction == DIRECTION::DOWN);
			if (row != movedRight[row]) {
				return true;
			}
		}
		target = target >> 16;
	}
	return false;
}

void State::generateTile() {
	DP(isFinished() == false);
	while (true) {
		int loc = rand() % 16;
		if (((this->board >> (loc * 4)) & 0xFULL) == 0) {
			board_t val = 1;
			if (rand() % 10 == 0) {
				val = 2;
			}
			this->board = (this->board | (val << (loc * 4)));
			break;
		}
	}
}

bool State::isFinished() {
	board_t temp = this->board;
	for (int r = 0; r < 4; r++)
	{
		row_t row = temp & 0xffffULL;
		if (hasZero[row] == true) {
			return false;
		}
		temp = temp >> 16;
	}
	if (isMovable(DIRECTION::UP) == true) {
		return false;
	}
	if (isMovable(DIRECTION::DOWN) == true) {
		return false;
	}
	if (isMovable(DIRECTION::LEFT) == true) {
		return false;
	}
	if (isMovable(DIRECTION::RIGHT) == true) {
		return false;
	}
#ifdef DEBUG
	int values[16];
	State::toIntArray(this->board, values);
	for (int i = 0; i < 16; i++)
	{
		DP(values[i] > 0);
	}
	for (int i = 0; i < 4; i++)
	{
		for (int j = 0; j < 3; j++)
		{
			DP(values[4 * i + j] != values[4 * i + j + 1]);
			DP(values[4 * j + i] != values[4 * (j + 1) + i]);
		}
	}
#endif // DEBUG

	return true;
}
