#ifndef __VERILOGMAKER_H__
#define __VERILOGMAKER_H__
#include "Constants.h"
#include "Pattern.h"
#include <string>
#include <map>
using namespace std;
namespace Grami {
    class CellDefinition{
    private:
        string name;
        map<string,uint> mapPortNameToID;
        map<uint,string> mapPortIDtoName;
        uint ID;

    public:
        CellDefinition(const string& cellName);
        ~CellDefinition();
        void insertPort(string name, uint id);
        uint getPortID(const string& name) const;
        string getPortName(uint id) const;
        uint getNumOfPorts() const;
        uint getID() const;
        void setID(uint id);
        void writeMetaInformation(ofstream& ofs);
        void refactorPinID(); // assign the same ID to the pins with the same role
        string getName() const;

        set<string> outputPorts;

    };

    class InstanceDefinition{
    private:
        CellDefinition* cd = nullptr;
        string name;
        uint ID = 0xffffffff;
    public:
        InstanceDefinition(const string& name, CellDefinition* cd);
        ~InstanceDefinition();
        string getName() const;
        CellDefinition* getCellDefinition() const;
        void setID(uint id);
        uint getID() const;
        uint getPinID(string name) const;
        string getPinName(uint id) const;
    };

    class VerilogMaker
    {
    private:


        string curModuleName = "";
        string delimeter = " \r\n\t";
        string padder = "(),{}";

        set<string> outputPinNames;
        set<string> cellwithMultiOutput;
        set<string> stopWord;

        set<string> groupNets;

        map<string,InstanceDefinition*> inputNets;
        map<string,InstanceDefinition*> outputNets;
        map<string,InstanceDefinition*> inoutNets;

        uint numOfDistinctPorts = 0;
        uint numOfDisticntNets = 0;
        uint numOfDistinctCells = 0;

        map<uint, vector<pair<string,InstanceDefinition*> >* > connectInformation;
        // connectInformation[netID] -> [(portID,instance), (portID,instance), ...]

        map<string, uint> mapNetNameToID;
        map<uint, string> mapNetIDToName;

        map<string, CellDefinition*> cellDefinition;
        vector<InstanceDefinition*> instanceDefs;

        map<uint, string> mapCellIDtoName;

        uint numOfPorts = 0;

        map<string, pair<nodeLabel_t,map<string,uint>*>> mapNodeLabelToID;
        map<nodeLabel_t, pair<string,map<uint,string>*>> mapIDtoNodeLabel;

    public:

        uint frequencyPercentToBeRemoved = 5;
        bool nameCut = true;
        static bool PINROLE ; // true -> AND's A = AND's B
        static bool CONNECT_BETWEEN_INPUTS ; // true -> connect AND_1's A and AND_2's A


        VerilogMaker();
        ~VerilogMaker();

        void readMetaFile(string filePath);
        string convertCircuit(const Pattern& p);

        void parseVerilogFile(const string& filepath);
        void handleTuple(const string& filepath);
        void generateGraphFile(const string& filepath);


    };
}

#endif
