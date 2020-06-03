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

When the null hypothesis <img src="https://latex.codecogs.com/svg.latex?H_0"/> is true, <img src="https://latex.codecogs.com/svg.latex?X=MSTR/MSE{\sim}F[k-1,nk-k]=F[2,18]"/>. Since the P-value is 0.17 for <img src="https://latex.codecogs.com/svg.latex?F=1.95"/> and it is not smaller than <img src="https://latex.codecogs.com/svg.latex?\alpha"/>=0.05, we cannot reject the null hypothesis <img src="https://latex.codecogs.com/svg.latex?H_0"/> and thus at 95% level of confidence we conclude that there is no significant difference in the exercise time for the three groups.




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
| Food | <img src="https://latex.codecogs.com/svg.latex?SS_{f}=n_h(\bar{x}_h-\bar{x})^2+n_{pi}(\bar{x}_{pi}-\bar{x})^2+n_{pa}(\bar{x}_{pa}-\bar{x})^2"/>=108.67 | <img src="https://latex.codecogs.com/svg.latex?n_w-1=2"/> | <img src="https://latex.codecogs.com/svg.latex?MS_f=SS_{f}/(n_w-1)"/>=54.33 | <img src="https://latex.codecogs.com/svg.latex?MS_f/MS_e"/>=2.43 |
| Beverage | <img src="https://latex.codecogs.com/svg.latex?SS_{b}=n_w(\bar{x}_w-\bar{x})^2+n_{c}(\bar{x}_{c}-\bar{x})^2+n_{s}(\bar{x}_{s}-\bar{x})^2+n_{m}(\bar{x}_{m}-\bar{x})^2"/>=1472.25 | <img src="https://latex.codecogs.com/svg.latex?n_h-1=3"/> | <img src="https://latex.codecogs.com/svg.latex?MS_b=SS_{b}/(n_h-1)"/>=490.75 | <img src="https://latex.codecogs.com/svg.latex?MS_b/MS_e"/>=21.97 |
| Error | <img src="https://latex.codecogs.com/svg.latex?SS_{e}=\sum_{f\in\{h,pi,pa\}}\sum_{b\in\{w,c,s,m\}}(x_{f,b}-\bar{x}_f-\bar{x}_b+\bar{x})^2"/>=134 | <img src="https://latex.codecogs.com/svg.latex?(n_w-1)(n_h-1)=6"/> | <img src="https://latex.codecogs.com/svg.latex?MS_e=SS_{e}/(n_w-1)(n_h-1)"/>=22.33 |  |
| Total     | <img src="https://latex.codecogs.com/svg.latex?SS_T=SS_f+SS_b+SS_e"/>=1714.917  | <img src="https://latex.codecogs.com/svg.latex?n-1"/>=11 |  |

where <img src="https://latex.codecogs.com/svg.latex?\bar{x}"/> is the average of all samples and
<img src="https://latex.codecogs.com/svg.latex?x_{f,b}"/> is the amount of order for the food <img src="https://latex.codecogs.com/svg.latex?f"/>  and the beverage <img src="https://latex.codecogs.com/svg.latex?b"/>.

When the null hypothesis <img src="https://latex.codecogs.com/svg.latex?H_{0F}"/> is true, <img src="https://latex.codecogs.com/svg.latex?X=MS_f/MS_e{\sim}F[n_w-1,n-1]=F[2,6]"/>. Since the P-value is 0.17 for <img src="https://latex.codecogs.com/svg.latex?F=2.43"/> and it is not smaller than <img src="https://latex.codecogs.com/svg.latex?\alpha"/>=0.05, we cannot reject the null hypothesis <img src="https://latex.codecogs.com/svg.latex?H_0"/> and thus at 95% level of confidence we conclude that there is no significant difference in the amount of order for the three foods studied.


