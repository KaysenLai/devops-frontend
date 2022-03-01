provider "aws" {
  region     = "ap-southeast-2"
  access_key = var.AWS_ACCESS_KEY_ID
  secret_key = var.AWS_SECRET_ACCESS_KEY
}

provider "aws" {
  alias  = "acm_provider"
  region = "us-east-1"
}
