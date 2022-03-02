Repo for GoExperts frontend sources without a pipeline. You need to construct a new one.

1. The resources for deployment the frontend should be first constructed by IaC tools like Terraform, CloudFormation, Ansible etc.
2. *DO NOT* operate on the `main` branch directly. Checkout your own branch instead, e.g. feature/new_pipeline
3. Compose your pipeline file and put them into `cicd`
4. Build up a pipeline on cicd platforms like Jenkins, Travis CI, Github Actions and have a test.


<h1>P3项目开展建议</h1>

与developers共同参与开展P3项目，对DevOps来说是一次不可多得的锻炼机会。在时间允许情况下，DevOps可以自由选择部署工具(Jenkins, Github Action)、平台(AWS, GCP, Azure)、架构(EC2, ECS, GKE,  AKS)和内容（frontend, backend, lambda)，也可以选择手动或者通过IaC工具(Terraform, CloudFormation）完成资源的搭建，还可以搭建自己的监控系统来对上述资源和服务进行监控。

由于P3项目一般在2~3个月内完成，建议从易到难分成三个阶段：

**Stage 1: Setup pipeline**

(1) 选择一个cloud platform（AWS,GCP,Azure），手动建立前端、后端、lambda等cloud资源，如：

**前端：**bucket (S3/GCS..) + CloudFront + Route 53 + CloudWatch

**后端：**ECS+ALB+EC2(or Fargate) ASG+Route53+CloudWatch

**Lambda:** Api Gateway+ Lambda+ CloudWatch

**(2) 编写pipeline(Jenkinsfile)**，能够实现手动运行代码拉取、build、docker镜像制作、以及服务的部署发布，并且测试前端和后端功能正常。建议顺序：frontend→backend→lambda

**前端pipeline Stages:**

<img width="397" alt="image" src="https://user-images.githubusercontent.com/99634236/154201734-3d7596b9-24c8-44c6-aaf6-6b51dd27f14c.png">

**后端pipeline Stages:**

<img width="408" alt="image" src="https://user-images.githubusercontent.com/99634236/154201810-9d43a99a-1225-404d-b343-0037c4b265d2.png">


(3) pipeline实现代码merge能够自动触发执行（注意bitbucket和github中设置触发Jenkins的方式不同）

**Stage 2: Buildup the resource through Terraform**

在完成Stage 1基础上，通过Terraform实现Stage 1所有cloud资源(bucket, EC2，ECS等）的自动构建，把Stage 1的pipeline移植为把服务自动部署到Terraform搭建的资源中。

Terraform建议用modules+applications结构，把一些可复用模块放到modules中，部署文件放到applications中

<img width="176" alt="image" src="https://user-images.githubusercontent.com/99634236/154201836-4911e586-9413-4c9e-9e28-eaaab690c968.png">


**Stage 3(挑战）: Setup monitoring**

搭建Elastic Stack，实现对上述平台和服务的监控

**其它建议：**

1. AWS平台必做，有余力Azure和GCP再选一个实现
2. Lambda的部署至少实现一个函数，有余力可以把整个backend做成lambda
3. 至少实现一个cluster结构的backend，ECS(AWS，EKS因AWS free tier不涵盖，会产生费用，土豪随意), GKE(GCP，利用新用户3个月US$300的credit), AKS(Azure，新用户1个月US$200的credit)。
4. CloudWatch尽量加上，有问题方便developers定位

**样例架构1:** AWS ECS with Fargate

<img width="1178" alt="image" src="https://user-images.githubusercontent.com/99634236/154201924-532c9a42-5667-42cc-9859-fb38bda2daa6.png">


**样例架构2** AWS+GCP

<img width="754" alt="image" src="https://user-images.githubusercontent.com/99634236/154201866-2c73e58c-2849-4eb8-871f-de6c20e0f157.png">

