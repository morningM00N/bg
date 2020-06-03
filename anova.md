<img src="https://latex.codecogs.com/svg.latex?a+b_i"/>

4. The sample data are organized as follows:


|   | Worker | University student         |  High-school student |
| :------------: | :-----------: | :-------------------: | :-------------------: |
| Sample Size     | <img src="https://latex.codecogs.com/svg.latex?n_w=7"/>          | <img src="https://latex.codecogs.com/svg.latex?n_u=7"/>  | <img src="https://latex.codecogs.com/svg.latex?n_h=7"/>  |
| Sample Mean    | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_w=37.57"/>     | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_u=41.43"/> | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_h=57.71"/> |
| Sample Standard Deviation    | <img src="https://latex.codecogs.com/svg.latex?{s_w}=13.59"/>     | <img src="https://latex.codecogs.com/svg.latex?{s_u}=25.77"/> | <img src="https://latex.codecogs.com/svg.latex?{s_h}=19.51"/> |


The hypotheses of interest are as follows:

<img src="https://latex.codecogs.com/svg.latex?H_0"/>: For all three groups, their mean times of exercise in a week are the same.

<img src="https://latex.codecogs.com/svg.latex?H_1"/>: Mean times of exercise in a week are different among the three groups.

The ANOVA Procedure

| Source of Variation  | Sums of Squares (SS) | Degrees of Freedom (df)         |  Mean Squares (MS) | F |
| :------------: | :-----------: | :-------------------: | :-------------------: | :-------------------: |
| Between Treatments     | <img src="https://latex.codecogs.com/svg.latex?SSTR=n_{w}(\bar{x}_w-\bar{x})^2+n_{u}(\bar{x}_u-\bar{x})^2+n_{h}(\bar{x}_h-\bar{x})^2"/>  =1600.29       | <img src="https://latex.codecogs.com/svg.latex?k-1=2"/> |  <img src="https://latex.codecogs.com/svg.latex?MSTR=SSTR/(k-1)"/>=800.14 | <img src="https://latex.codecogs.com/svg.latex?F=MSTR/MSE"/>=1.95
| Error (or Residual)    | <img src="https://latex.codecogs.com/svg.latex?SSE=\sum_{j=1}^{n_w}(x_{wj}-\bar{x}_w)^2+\sum_{j=1}^{n_u}(x_{uj}-\bar{x}_u)^2+\sum_{j=1}^{n_h}(x_{hj}-\bar{x}_h)^2"/> = 7376.86   | <img src="https://latex.codecogs.com/svg.latex?nk-k"/> | <img src="https://latex.codecogs.com/svg.latex?MSE=SSE/(nk-k)"/>=409.83 |
| Total     | <img src="https://latex.codecogs.com/svg.latex?SST=SSRT+SSE"/>=8977.14  | <img src="https://latex.codecogs.com/svg.latex?nk-1"/>=20 |  |

where <img src="https://latex.codecogs.com/svg.latex?\bar{x}"/> is the average of all samples and
<img src="https://latex.codecogs.com/svg.latex?x_{wj}"/>, <img src="https://latex.codecogs.com/svg.latex?x_{uj}"/> and <img src="https://latex.codecogs.com/svg.latex?x_{hj}"/> are the <img src="https://latex.codecogs.com/svg.latex?{j}"/>-th sample for the workers, university students and high-school students, respectively.
