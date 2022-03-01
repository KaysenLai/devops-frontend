resource "aws_s3_bucket" "my_bucket" {
  bucket = var.bucket_name
  tags   = var.common_tags
}

resource "aws_s3_bucket_acl" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id
  acl    = "public-read"
}

resource "aws_s3_bucket_cors_configuration" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id

  cors_rule {
    allowed_headers = ["*"]
    allowed_methods = ["GET", "POST"]
    allowed_origins = ["https://${var.domain_name}"]
    expose_headers  = ["ETag"]
    max_age_seconds = 3000
  }
}

resource "aws_s3_bucket_policy" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id
  policy = templatefile("templates/s3-policy.json", { bucket = "${var.bucket_name}" })
}

resource "aws_s3_bucket_website_configuration" "my_bucket" {
  bucket = aws_s3_bucket.my_bucket.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "error.html"
  }
}