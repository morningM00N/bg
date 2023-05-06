#ifndef __CONSTANTS_H__
#define __CONSTANTS_H__


#define MAX(a,b) (((a)>(b))?(a):(b))
#define MIN(a,b) (((a)<(b))?(a):(b))
#define DEBUG
#define DEBUGLOG
typedef unsigned int uint;
typedef unsigned short ushort;

typedef unsigned int nodeID_t;
typedef unsigned short nodeLabel_t;
typedef unsigned short edgeLabel_t;

#ifdef DEBUG

void updateCounter(int v = 0);

void DP(bool	 b);
#define INITIAL_SIZE 8
#else 
#define INITIAL_SIZE 1024
#define DP(a)
#endif


#endif
