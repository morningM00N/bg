pattern.h
    vector<bool> existOutputPins;
    vector<vector<TPStrInstDefP>*> connections;
    vector<InstanceDefinition*> instances;
    map<InstanceDefinition*,uint> mapInstanceIdx;
    Occurrence occurrence;
    Pattern* srcPattern = nullptr;
    Pattern* canPattern = nullptr;
    uint* netFreq = nullptr;
    uint* freq = nullptr;


    map<TPStrUint, uint> mapFOmax;
    map<TPStrUint, uint> mapFOmin;
    map<TPStrUint, uint> mapFOtotal;
    uint stage = 0;
    uint totalInputPinSize = 0;
    uint totalOutputPinSize = 0;
    uint mergedInputPinSize = 0;
    uint mergedOutputPinSize = 0;


CellDefinitiion.h

      uint id;
    string name; // cell name ex., NOR3
    vector<string> inputPins; // vector of input pins ex., A, B, C
    map<string,Equation*> outputPins; // set of output pins ex., Y
    map<string, set<string>*> sameRolePins; // sameRolePins["A"] = ["B","C"], sameRolePins["B"] = ["A","C"],         map<string, vector<string>*> sameRolePins; // sameRolePins["A"] = ["B","C"], sameRolePins["C"] = ["A","B"]
    map<string, set<string>*> sameRolePinsItSelf; // sameRolePins["A"] = ["A","B","C"], sameRolePins["B"] = ["A","B","C"],         map<string, vector<string>*> sameRolePins; // sameRolePins["A"] = ["B","C"], sameRolePins["C"] = ["A","B"]
    vector<string> sameInputPinHeaders; // A=B=C, X=Y=Z -> sameInputPinHeaders = {A,X}
    vector<string> sameOutputPinHeaders;
    bool calculatedSameRolePins = false; // true if this->calcSameRolePins() is called


class InstanceDefinition{
    CellDefinition* cd = nullptr;
    string name;
    uint ID = INIT_NULL_VAL;
    map<string, string> connectedNetID; // connectedNetID["A"]=0 // pin A is connected to net0
    //map<string,set<string>*> netConnectInfor; // netConnectInfor[0] = ["A","B"]
    uint stageLevel=0;
    //uint idxForSameToPreview = INIT_NULL_VAL; // in pattern, if inst[3].sameInPattern(inst[1]) = true, inst[3].idxForSameToPreview = 1
    map<string, uint*> FOs;
