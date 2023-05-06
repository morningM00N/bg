#pragma once
#include <assert.h>
typedef unsigned long long board_t;
typedef unsigned short row_t;

void DP(bool b);

enum DIRECTION{
UP,DOWN,LEFT,RIGHT
};

#define DEBUG

#define SHOW(a) cout<<#a<<":"<<a<<endl
