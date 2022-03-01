provider "aws" {
  region                   = "ap-southeast-2"
  shared_credentials_files = ["/home/kevin/.aws/credentials"]
  profile                  = "default"
}

provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"
}