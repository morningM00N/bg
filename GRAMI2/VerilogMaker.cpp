#include "VerilogMaker.h"
#include <fstream>

#include <sstream>
#include <iostream>
#include <QRegularExpression>
#include <QString>
#include <set>
#include <string>

using namespace std;
void Grami::VerilogMaker::readMetaFile(string filePath)
{
    ifstream ifs(filePath);
    string line;
    while (getline(ifs, line))
    {
        istringstream iss(line);
        string word;
        string cellName;
        iss >> cellName;
        if (cellName == "__numOfPort__") {
            getline(ifs, line);
            this->numOfPorts = static_cast<uint> (stoi(line));
            break;
        }
        iss >> word;
        nodeLabel_t cellID = static_cast<nodeLabel_t>(stoi(word));
        this->mapCellIDtoName[cellID] = cellName;
        iss >> word;
        map<string, uint>* mapPortNameToID = new map<string, uint>();
        map<uint, string>* mapPortIDtoName= new map<uint, string>();
        uint numOfPorts = static_cast<uint>(stoi(word));
        for (uint i = 0; i < numOfPorts; i++)
        {
            getline(ifs, line);
            istringstream iss2(line);
            string portName;
            iss2 >> portName;
            iss2 >> word;
            uint portID = static_cast<uint>(stoi(word));
            (*mapPortNameToID)[portName] = portID;
            (*mapPortIDtoName)[portID] = portName;
        }
        this->mapNodeLabelToID[cellName] = pair<nodeLabel_t, map<string, uint>*>(cellID, mapPortNameToID);
        this->mapIDtoNodeLabel[cellID] = pair<string, map<uint, string>*>(cellName, mapPortIDtoName);
    }
}

string Grami::VerilogMaker::convertCircuit(const Pattern & p)
{
    string ret;

    map<string, uint> connectMap;


    uint edgeID = 0;
    map<pair<ushort, ushort>, set<edgeLabel_t>*>* edges = p.getEdgeTypes();
    if (edges->size()>1){
        int a=3;

    }
    for (map<pair<ushort, ushort>, set<edgeLabel_t>*>::iterator it = edges->begin();
         it != edges->end();
         ++it) {
        ushort srcIdx = it->first.first;
        ushort destIdx = it->first.second;

        nodeLabel_t srcLabel = p.getLabelofIthNode(srcIdx);
        nodeLabel_t destLabel = p.getLabelofIthNode(destIdx);

        if (this->mapIDtoNodeLabel.find(srcLabel)==this->mapIDtoNodeLabel.end() ||
                this->mapIDtoNodeLabel.find(destLabel)==this->mapIDtoNodeLabel.end()){
            continue;
        }

        pair<string,map<uint, string>*> srcPortMap = this->mapIDtoNodeLabel[srcLabel];
        pair<string, map<uint, string>*> destPortMap = this->mapIDtoNodeLabel[destLabel];

        if (destPortMap.first=="" || srcPortMap .first==""){
            continue;
        }


        set<edgeLabel_t>* labels = it->second;


        for (set<edgeLabel_t>::iterator it2 = labels->begin();
             it2 != labels->end();
             ++it2) {
            uint srcEdgeID = (*it2) / this->numOfPorts;
            uint destEdgeID = (*it2) % this->numOfPorts;
            if (srcPortMap.second->find(srcEdgeID) == srcPortMap.second->end()) {
                destEdgeID = (*it2) / this->numOfPorts;
                srcEdgeID = (*it2) % this->numOfPorts;
            }

            string srcKeyValue = to_string(srcIdx) + ":" + (*srcPortMap.second)[srcEdgeID];
            string destKeyValue = to_string(destIdx) + ":" + (*destPortMap.second)[destEdgeID];
            map<string, uint>::iterator it3 = connectMap.find(srcKeyValue);
            map<string, uint>::iterator it4 = connectMap.find(destKeyValue);
            uint thisEdgeID=edgeID;
            if (it3!=connectMap.end()){
                thisEdgeID = it3->second;
            }
            else if (it4!=connectMap.end()){
                thisEdgeID = it4->second;
            }else{
                edgeID++;
            }

            connectMap[srcKeyValue] = thisEdgeID;
            connectMap[destKeyValue] = thisEdgeID;

            //            ret += (
            //                        to_string(srcIdx) + ":" + srcPortMap.first + ":" + (*srcPortMap.second)[srcEdgeID]
            //                        );
            //            ret += "---";
            //            ret += (
            //                        to_string(destIdx) + ":" + destPortMap.first + ":" + (*destPortMap.second)[destEdgeID]
            //                        );
            //            ret += "\n";

        }
    }

    for (uint i = 0; i < p.getNumOfNodes(); i++)
    {
        nodeLabel_t nl = p.getLabelofIthNode(i);

        string cellName = this->mapCellIDtoName[nl];

        ret += this->mapIDtoNodeLabel[nl].first +" " +
                this->mapIDtoNodeLabel[nl].first+"_"+to_string(i) +"(\n";
        map<string, uint>* portMap = this->mapNodeLabelToID[cellName].second;
        bool prev=false;
        for (map<string, uint>::iterator it = portMap->begin();
             it!=portMap->end();
             ++it
             ){
            string pinName =it->first;
            string keyValue = to_string(i) + ":" + pinName;
            if (prev==true){
                ret += ",\n";
            }
            prev=true;
            ret += '\t';
            ret += pinName;
            ret += "(";
            if (connectMap.find(keyValue)!=connectMap.end()){
                ret += "net_";
                ret += to_string(connectMap[keyValue]);
            }
            ret += ')';
        }
        ret += ");\n";
    }

    return ret;
}



Grami::VerilogMaker::VerilogMaker()
{
    this->stopWord.insert("input");
    this->stopWord.insert("output");
    this->stopWord.insert("inout");
    this->stopWord.insert("wire");
    this->stopWord.insert("module");
    this->stopWord.insert("endmodule");
    this->stopWord.insert("assign");

    this->outputPinNames.insert(".Y");
    this->outputPinNames.insert(".S");
    this->outputPinNames.insert(".Q");
    this->outputPinNames.insert(".QN");
    this->outputPinNames.insert(".CO");
    this->outputPinNames.insert(".ECK");
    this->outputPinNames.insert(".CON");
    this->outputPinNames.insert(".ICO");

    this->outputPinNames.insert(".y");
    this->outputPinNames.insert(".s");
    this->outputPinNames.insert(".q");
    this->outputPinNames.insert(".co");
    this->outputPinNames.insert(".z");
    this->outputPinNames.insert(".nq");
    this->outputPinNames.insert(".q0");
    this->outputPinNames.insert(".q1");
    this->outputPinNames.insert(".q2");
    this->outputPinNames.insert(".q3");
    this->outputPinNames.insert(".q4");
    this->outputPinNames.insert(".q5");
    this->outputPinNames.insert(".q6");
    this->outputPinNames.insert(".q7");
    this->outputPinNames.insert(".nz");
    this->outputPinNames.insert(".nco");
    this->outputPinNames.insert(".clk_en");
    this->outputPinNames.insert(".\mux_out[0]");

    this->cellwithMultiOutput.insert("ADDF");
    this->cellwithMultiOutput.insert("ADDH");
    this->cellwithMultiOutput.insert("CMPR42");
    this->cellwithMultiOutput.insert("t0uhd_ln3_sec_sdfarv8t01p00_n1");
    this->cellwithMultiOutput.insert("t0uhd_ln3_sec_sdf8t01p00_n2");



}

Grami::VerilogMaker::~VerilogMaker()
{
}

void Grami::VerilogMaker::parseVerilogFile(const string &filepath)
{
    ifstream ifs(filepath);

    string line;
    string tuple;
    bool comments=false;
    while (getline(ifs, line)){
        if (comments==true){
            size_t loc2 = line.find("*/");
            if (loc2!=string::npos){
                line = line.substr(loc2+2);
                comments=false;
            }
            else{
                continue;
            }
        }

        size_t loc = line.find("//");
        if (loc!=string::npos){
            line = line.substr(0,loc);
        }
        size_t loc2 = line.find("/*");
        if (loc2!=string::npos){
            comments=true;
            line = line.substr(0,loc2);
        }
        tuple.append(line);
        if (line.find(';')!=string::npos || line.find("endmodule")!=string::npos){
            this->handleTuple(tuple);
            if (line.find("endmodule")!=string::npos){
                return;
            }
            tuple.clear();
        }
    }

    return ;
}

void getRange(string str, uint& start, uint& end){
    string s = str.substr(1,str.find(':')-1);
    string e = str.substr(str.find(':')+1,str.length()-2);
    start = stoi(s);
    end=stoi(e);
}
void Grami::VerilogMaker::handleTuple(const string &filepath)
{

    {
        istringstream iss(filepath);
        string word;
        iss >> word;
        if (CONTAIN(this->stopWord,word)){
            if (word == "input" || word == "output" || word=="inout"){
                string name;
                iss >> name;
                uint start=0; uint end=0;
                bool range=false;
                if (name[0]=='['){
                    range=true;
                    getRange(name,start,end);
                    iss >> name;
                }
                if (name.find(';')!=string::npos){
                    name = name.substr(0,name.find(';'));
                }
                for(uint idx = end; idx<=start; ++idx){
                    DP(this->curModuleName!="");
                    string thisName = this->curModuleName+"__"+name;
                    if (range==true){
                        thisName += ("["+to_string(idx)+"]");
                    }
                    if (word == "input" ){
                        DP(this->inputNets.find(thisName)==this->inputNets.end());
                        this->inputNets[thisName]=nullptr;
                    }
                    else if (word == "output"){
                        DP(this->outputNets.find(thisName)==this->outputNets.end());
                        this->outputNets[thisName]=nullptr;
                    }
                    else if (word=="inout"){
                        DP(this->inoutNets.find(thisName)==this->inoutNets.end());
                        this->inoutNets[thisName]=nullptr;
                    }

                }
            }
            else if (word == "module"){
                DP(this->curModuleName == "");
                iss >> word;
                this->curModuleName = word;
            }
            else if (word == "endmodule"){
                DP(this->curModuleName != "");
                this->curModuleName = "";
            }
            return;
        }
    }

    string line;
    for(uint i=0; i<filepath.length(); ++i){
        if (this->delimeter.find(filepath[i])!=string::npos){
            if (i<filepath.length()-1 && filepath[i+1]!='['){
                line += ' ';
            }
        }
        else if (this->padder.find(filepath[i])!=string::npos){
            line += ' ';
            line += filepath[i];
            line += ' ';
        }
        else{
            line+=filepath[i];
        }
    }

    istringstream iss(line);
    string word;
    string cellName;
    iss>>cellName;

    if (this->nameCut==true && cellName.find("scpu")==string::npos){
        cellName = cellName.substr(0,cellName.find('_'));
    }

    string instName;
    iss >> instName;
    iss >> word;
    DP(word == "(");


    CellDefinition* cd=nullptr;
    bool cellDefine = false;
    map<string, CellDefinition*>::iterator it = this->cellDefinition.find(cellName);
    if (it==this->cellDefinition.end()){
        cellDefine=true;
        cd = new CellDefinition(cellName);
        cd->setID(this->numOfDistinctCells);
        ++this->numOfDistinctCells;
        this->cellDefinition[cellName]=cd;
    } else{
        cellDefine = false;
        cd = it->second;
    }

    InstanceDefinition* newInst = new InstanceDefinition(instName,cd);


    string pinName;
    string netName;
    int numOfPins = 0;
    while (true){
        iss >> pinName;
        if (pinName==","){
            iss>>pinName;
        }
        else if (pinName == ")"){
            iss >> word;
            DP(word==";");
            break;
        }

        DP(pinName[0]=='.');

        iss >> word;
        DP(word=="(");
        iss >> netName;
        updateCounter();
        bool connectArray = false;
        if (netName == "{"){
            iss >> netName;
            connectArray =true;
            while (netName != "}"){
                if (netName != ","){
                    this->groupNets.insert(this->curModuleName+"__"+netName);
                }
                iss>>netName;
            }
        }
        else if (netName.find(':')!=string::npos &&
                 netName.find('[')!=string::npos &&
                 netName[netName.length()-1]==']' &&
                 netName.find('[') < netName.find(':')
                 ){
            connectArray=true;
            string namePart = netName.substr(0,netName.find('['));
            string rangePart = netName.substr(netName.find('['));
            uint start=0;
            uint end = 0;
            getRange(rangePart,start,end);
            for (uint k=MIN(start,end); k <= MAX(start,end); ++k){
                this->groupNets.insert(this->curModuleName+"__"+namePart+"["+to_string(k)+"]");
            }

        }

        if (netName == ")"){
            netName = "";
        }
        else{
            netName = this->curModuleName+"__"+netName;
            updateCounter();
            iss >> word;
            DP(word == ")");
        }

        if (cellDefine==true){
            cd->insertPort(pinName,numOfDistinctPorts);
            ++numOfDistinctPorts;
        }

        if (connectArray==true){
            continue;
        }

        if (CONTAIN(this->outputPinNames,pinName)==true){
            cd->outputPorts.insert(pinName);
        }

        uint netID;
        if (netName!=""){
            map<string, uint>::iterator it = this->mapNetNameToID.find(netName);
            if (it==this->mapNetNameToID.end()){
                netID = this->numOfDisticntNets;
                this->mapNetNameToID[netName] = netID;
                this->mapNetIDToName[netID]=netName;
                ++this->numOfDisticntNets;
            }
            else{
                netID = it->second;
            }
        }
        //        newInst->connectNet(pinName,netID);
        ++numOfPins;
        if (netName!=""){
            vector<pair<string,InstanceDefinition*> >* tempVector=nullptr;
            map<uint, vector<pair<string,InstanceDefinition*> >* >::iterator it2=this->connectInformation.find(netID);
            if (it2==this->connectInformation.end()){
                tempVector = new vector<pair<string,InstanceDefinition*> >();
                this->connectInformation[netID] = tempVector;
            }
            else{
                tempVector = it2->second;
            }
            tempVector->push_back(pair<string, InstanceDefinition*>(pinName,newInst));
        }

    }
    if (numOfPins>0){
        newInst->setID(this->instanceDefs.size());
        this->instanceDefs.push_back(newInst);
    }

}

void Grami::VerilogMaker::generateGraphFile(const string &filepath)
{

    {
        string cellName = "__INPUT_PINS__";
        CellDefinition* cd=nullptr;
        cd = new CellDefinition(cellName);
        cd->setID(this->numOfDistinctCells);
        ++this->numOfDistinctCells;
        this->cellDefinition[cellName]=cd;
        cd->insertPort(".input",numOfDistinctPorts);
        ++numOfDistinctPorts;

        for(map<string,InstanceDefinition*>::iterator it = this->inputNets.begin();
            it!=this->inputNets.end();++it){
            InstanceDefinition* newInst = new InstanceDefinition(it->first,cd);
            it->second = newInst;
            newInst->setID(this->instanceDefs.size());
            this->instanceDefs.push_back(newInst);
        }
    }

    {
        string cellName = "__OUTPUT_PINS__";
        CellDefinition* cd=nullptr;
        cd = new CellDefinition(cellName);
        cd->setID(this->numOfDistinctCells);
        ++this->numOfDistinctCells;
        this->cellDefinition[cellName]=cd;
        cd->insertPort(".output",numOfDistinctPorts);
        ++numOfDistinctPorts;

        for(map<string,InstanceDefinition*>::iterator it = this->outputNets.begin();
            it!=this->outputNets.end();++it){

            InstanceDefinition* newInst = new InstanceDefinition(it->first,cd);
            it->second = newInst;
            newInst->setID(this->instanceDefs.size());
            this->instanceDefs.push_back(newInst);
        }

    }

    {
        string cellName = "__INOUT_PINS__";
        CellDefinition* cd=nullptr;
        cd = new CellDefinition(cellName);
        cd->setID(this->numOfDistinctCells);
        ++this->numOfDistinctCells;
        this->cellDefinition[cellName]=cd;
        cd->insertPort(".inout",numOfDistinctPorts);
        ++numOfDistinctPorts;

        for(map<string,InstanceDefinition*>::iterator it = this->inoutNets.begin();
            it!=this->inoutNets.end();++it){
            InstanceDefinition* newInst = new InstanceDefinition(it->first,cd);
            it->second = newInst;
            newInst->setID(this->instanceDefs.size());
            this->instanceDefs.push_back(newInst);
        }

    }
    ofstream ofsmeta(filepath+"_meta");

    cout<<"zero output"<<endl;
    for(map<string,CellDefinition*>::iterator it=this->cellDefinition.begin();
        it!=this->cellDefinition.end();
        ++it){
        if (it->second->outputPorts.size()==0){
            cout<<it->first<<endl;
        }
    }


    cout<<"multiple output"<<endl;
    for(map<string,CellDefinition*>::iterator it=this->cellDefinition.begin();
        it!=this->cellDefinition.end();
        ++it){
        if (it->second->outputPorts.size()>1){
            cout<<it->first<<endl;
        }
    }

    for(map<string,CellDefinition*>::iterator it=this->cellDefinition.begin();
        it!=this->cellDefinition.end();
        ++it){
        if (this->PINROLE==true){
            it->second->refactorPinID();
        }
        it->second->writeMetaInformation(ofsmeta);
    }
    ofsmeta<<"__numOfPort__"<<endl;
    ofsmeta<<this->numOfDistinctPorts<<endl;
    ofsmeta.flush();


    if (false)
    {
        for(uint i=0; i<this->instanceDefs.size(); ++i){
            InstanceDefinition* id = this->instanceDefs[i];
            DP(i==id->getID());

            ofsmeta<<i<<'\t'<<
                     id->getName()<<'\t'<<
                     id->getCellDefinition()->getID()<<endl;
        }
    }

    ofsmeta.flush();
    ofsmeta.close();


    ofstream ofs(filepath);

    for(uint i=0; i<this->instanceDefs.size(); ++i){
        InstanceDefinition* id = this->instanceDefs[i];
        ofs<<"v\t"<<i<<'\t'<<id->getCellDefinition()->getID()<<endl;
    }

    for(
        map<uint, vector<pair<string,InstanceDefinition*> >* >::iterator it = this->connectInformation.begin();
        it!=this->connectInformation.end();
        ++it
        ){
        if (it->second->size()>this->instanceDefs.size()*this->frequencyPercentToBeRemoved/100){
            continue;
        }
        uint netID = it->first;
        string netName = this->mapNetIDToName[netID];
        vector<pair<string,InstanceDefinition*> >* conInstances= it->second;
        uint outputIdx = 0xffffffff;
        for(uint j=0; j<conInstances->size(); ++j){
            string pinName = AT(conInstances,j).first;
            InstanceDefinition* inst = AT(conInstances,j).second;
            //string pinName = inst->getCellDefinition()->getPortName(pinID);
            if (CONTAIN(this->outputPinNames,pinName)==true){
                DP(outputIdx==0xffffffff);
                outputIdx=j;
            }

        }
        if (CONTAIN(this->inputNets,netName)==false && CONTAIN(this->groupNets,netName)==false){
#ifdef DEBUG_EXISTS_OUTPUT_PIN
            if (outputIdx==0xffffffff){
                set<string> tempSet;
                for(uint j=0; j<conInstances->size(); ++j){
                    string pinName = AT(conInstances,j).first;
                    InstanceDefinition* inst = AT(conInstances,j).second;
                    tempSet.insert(inst->getCellDefinition()->getName()+"/"+pinName);
                }
                DP(false);
            }
#endif
        }

        //if (this->CONNECT_BETWEEN_INPUTS==false)
        { // connect between input <-> output pin only
            InstanceDefinition* outputInst = nullptr;
            string outputPinName;

            bool groupNetSkip= false;
            if (outputIdx!=0xffffffff){
                outputInst=AT(conInstances,outputIdx).second;
                outputPinName=AT(conInstances,outputIdx).first;
            } else if (CONTAIN(this->groupNets,netName)==true){
                groupNetSkip=true;
            }
            else if (CONTAIN(this->inputNets,netName)==true){
                map<string,InstanceDefinition*>::iterator it = this->inputNets.find(netName);
                DP(it!=this->inputNets.end());
                outputInst = it->second;
                outputPinName=".input";
            }
            else{
                continue;
            }

            if (groupNetSkip==true){
                continue;
            }
            uint outputPinID = outputInst->getPinID(outputPinName);

            DP(outputPinID < this->numOfDistinctPorts);

            for(uint j=0; j<conInstances->size(); ++j){
                if (j==outputIdx){
                    continue;
                }
                InstanceDefinition* curInst = AT(conInstances,j).second;
                string curPinName = AT(conInstances,j).first;

                uint curPinID = curInst->getPinID(curPinName);

                DP(curPinID < this->numOfDistinctPorts);

                uint edgeLabel = outputPinID * this->numOfDistinctPorts + curPinID;
                ofs << "e\t"<<outputInst->getID()<<'\t'<<
                       curInst->getID()<<'\t'<<
                       edgeLabel<<endl;
            }
        }
        if (this->CONNECT_BETWEEN_INPUTS==true){

            for(uint j=0; j<conInstances->size(); ++j){
                if (j==outputIdx){
                    continue;
                }
                InstanceDefinition* curInst = AT(conInstances,j).second;
                uint curInstID = curInst->getID();
                string curPinName = AT(conInstances,j).first;
                uint curPinID = curInst->getPinID(curPinName);


                DP(curPinID < this->numOfDistinctPorts);
                for (uint k=j+1;k<conInstances->size();++k) {
                    if (k==outputIdx){
                        continue;
                    }

                    uint curInstIDbk = curInstID;
                    uint curPinIDbk = curPinID;


                    InstanceDefinition* curInst2 = AT(conInstances,k).second;
                    uint curInstID2 = curInst2->getID();
                    string curPinName2 = AT(conInstances,k).first;
                    uint curPinID2 = curInst2->getPinID(curPinName2);

                    if (curInst->getCellDefinition()->getID()>curInst2->getCellDefinition()->getID()){
                        SWAP(uint,curInstIDbk, curInstID2);
                        SWAP(uint,curPinIDbk, curPinID2);
                    }

                    uint edgeLabel = curPinIDbk* this->numOfDistinctPorts + curPinID2;
                    ofs << "e\t"<<curInstIDbk<<'\t'<<
                           curInstID2<<'\t'<<
                           edgeLabel<<endl;
                }
            }
        }
    }



    ofs.flush();
    ofs.close();



}


Grami::CellDefinition::CellDefinition(const string &cellName)
{
    this->name = cellName;
}

Grami::CellDefinition::~CellDefinition()
{
}

void Grami::CellDefinition::insertPort(string name, uint id)
{
    DP(this->mapPortNameToID.find(name)==this->mapPortNameToID.end());
    DP(this->mapPortIDtoName.find(id)==this->mapPortIDtoName.end());

    this->mapPortIDtoName[id] = name;
    this->mapPortNameToID[name] = id;
}

uint Grami::CellDefinition::getPortID(const string& name) const
{
    if (this->mapPortNameToID.find(name)==this->mapPortNameToID.end()){
        return 0xffffffff;
    }
    return this->mapPortNameToID.find(name)->second;
}

string Grami::CellDefinition::getPortName(uint id) const
{
    if (this->mapPortIDtoName.find(id)==this->mapPortIDtoName.end()){
        return "";
    }
    return this->mapPortIDtoName.find(id)->second;

}

uint Grami::CellDefinition::getNumOfPorts() const
{
    DP(this->mapPortIDtoName.size() == this->mapPortIDtoName.size());
    return static_cast<uint>(this->mapPortIDtoName.size());
}

uint Grami::CellDefinition::getID() const
{
    return this->ID;
}

void Grami::CellDefinition::setID(uint id)
{
    this->ID = id;
}

void Grami::CellDefinition::writeMetaInformation(ofstream &ofs)
{
    ofs<<this->name<<'\t'<<this->ID<<'\t'<<this->mapPortNameToID.size()<<endl;
    for(map<string,uint>::iterator it = this->mapPortNameToID.begin();
        it!=this->mapPortNameToID.end();
        ++it){
        ofs<<it->first<<'\t'<<it->second<<endl;
    }
    ofs.flush();
}

void Grami::CellDefinition::refactorPinID()
{
    if (this->mapPortNameToID.size()==0){
        return;
    }
    map<string,uint>::iterator nextit = this->mapPortNameToID.begin();
    ++nextit;
    map<string,uint>::iterator it = this->mapPortNameToID.begin();
    while (nextit!=this->mapPortNameToID.end()){
        string nextPinName = nextit->first;
        string thisPinName = it->first;

        if ((thisPinName.length() == nextPinName.length()) && // same length
                ( thisPinName.substr(0,thisPinName.length()-1)==
                  nextPinName.substr(0,nextPinName.length()-1)) && // same prefix
                ( thisPinName[thisPinName.length()-1]+1==
                  nextPinName[nextPinName.length()-1]) // postfix precedure
                ){
            nextit->second = it->second;
        }

        ++nextit;
        ++it;
    }
}

string Grami::CellDefinition::getName() const
{
    return this->name;
}

Grami::InstanceDefinition::InstanceDefinition(const string& _name, Grami::CellDefinition* _cd)
{
    this->name = _name;
    this->cd = _cd;
}


string Grami::InstanceDefinition::getName() const
{
    return this->name;
}

Grami::CellDefinition *Grami::InstanceDefinition::getCellDefinition() const
{
    return this->cd;
}

void Grami::InstanceDefinition::setID(uint id)
{
    this->ID=id;
}

uint Grami::InstanceDefinition::getID() const
{
    return this->ID;
}

uint Grami::InstanceDefinition::getPinID(string name) const
{
    return this->cd->getPortID(name);
}

string Grami::InstanceDefinition::getPinName(uint id) const
{
    return this->cd->getPortName(id);
}
