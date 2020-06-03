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

Suppose that a singificance level <img src="https://latex.codecogs.com/svg.latex?\alpha"/>  is 0.05.

**The ANOVA Procedure**

| Source of Variation  | Sums of Squares (SS) | Degrees of Freedom (df)         |  Mean Squares (MS) | F |
| :------------: | :-----------: | :-------------------: | :-------------------: | :-------------------: |
| Between Treatments     | <img src="https://latex.codecogs.com/svg.latex?SSTR=n_{w}(\bar{x}_w-\bar{x})^2+n_{u}(\bar{x}_u-\bar{x})^2+n_{h}(\bar{x}_h-\bar{x})^2"/>  =1600.29       | <img src="https://latex.codecogs.com/svg.latex?k-1=2"/> |  <img src="https://latex.codecogs.com/svg.latex?MSTR=SSTR/(k-1)"/>=800.14 | <img src="https://latex.codecogs.com/svg.latex?F=MSTR/MSE"/>=1.95
| Error (or Residual)    | <img src="https://latex.codecogs.com/svg.latex?SSE=\sum_{j=1}^{n_w}(x_{wj}-\bar{x}_w)^2+\sum_{j=1}^{n_u}(x_{uj}-\bar{x}_u)^2+\sum_{j=1}^{n_h}(x_{hj}-\bar{x}_h)^2"/> = 7376.86   | <img src="https://latex.codecogs.com/svg.latex?nk-k"/> | <img src="https://latex.codecogs.com/svg.latex?MSE=SSE/(nk-k)"/>=409.83 |
| Total     | <img src="https://latex.codecogs.com/svg.latex?SST=SSRT+SSE"/>=8977.14  | <img src="https://latex.codecogs.com/svg.latex?nk-1"/>=20 |  |

where <img src="https://latex.codecogs.com/svg.latex?\bar{x}"/> is the average of all samples and
<img src="https://latex.codecogs.com/svg.latex?x_{wj}"/>, <img src="https://latex.codecogs.com/svg.latex?x_{uj}"/> and <img src="https://latex.codecogs.com/svg.latex?x_{hj}"/> are the <img src="https://latex.codecogs.com/svg.latex?{j}"/>-th sample for the workers, university students and high-school students, respectively.

When the null hypothesis <img src="https://latex.codecogs.com/svg.latex?H_0"/> is true, <img src="https://latex.codecogs.com/svg.latex?X=MSTR/MSE{\sim}F[k-1,nk-k]=F[2,18]"/>. Since the P-value is 0.17 for <img src="https://latex.codecogs.com/svg.latex?F=1.95"/> and it is not smaller than <img src="https://latex.codecogs.com/svg.latex?\alpha"/>=0.05, we cannot reject the null hypothesis <img src="https://latex.codecogs.com/svg.latex?H_0"/>.




5. The sample data are organized as follows:


| Summary  | Count | Average | Standard Deviation |
| :------------: | :-----------: | :-------------------: | :-------------------: | 
| Hamberger     | <img src="https://latex.codecogs.com/svg.latex?n_{h}"/>=4 | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_h"/>=30.75  | 178.92 |
| Pizza | <img src="https://latex.codecogs.com/svg.latex?n_{pi}"/>=4 | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_{pi}"/>=32.25 | 247.58 |
| Pasta | <img src="https://latex.codecogs.com/svg.latex?n_{pa}"/>=4 | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_{pa}"/>=25.25 | 108.92 |
| | | |
| Water | <img src="https://latex.codecogs.com/svg.latex?n_w"/>=3 | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_w"/>=27.33 | 46.33|
| Coke  | <img src="https://latex.codecogs.com/svg.latex?n_c"/>=3 | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_c"/>=41.33 | 66.33|
| Sprite | <img src="https://latex.codecogs.com/svg.latex?n_s"/>=3 | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_s"/>=36.67 | 2.33|
| Milk | <img src="https://latex.codecogs.com/svg.latex?n_m"/>=3 | <img src="https://latex.codecogs.com/svg.latex?\bar{x}_m"/>=12.33 | 6.33|


We are interest in testing Null hypotheses

<img src="https://latex.codecogs.com/svg.latex?H_{0F}"/>: The amount of order in a day does not depend on the type of food.

<img src="https://latex.codecogs.com/svg.latex?H_{0B}"/>: The amount of order in a day does not depend on the type of beverage.

Assume that a singificance level <img src="https://latex.codecogs.com/svg.latex?\alpha"/>  is 0.05.

**The ANOVA Procedure**

| Source of Variation  | Sums of Squares (SS) | Degrees of Freedom (df)         |  Mean Squares (MS) | F |
| :------------: | :-----------: | :-------------------: | :-------------------: | :-------------------: |
| Food | <img src="https://latex.codecogs.com/svg.latex?SS_{f}="/>
