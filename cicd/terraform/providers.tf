provider "aws" {
  region                   = "ap-southeast-2"
  profile                  = "default"
}

provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"
}