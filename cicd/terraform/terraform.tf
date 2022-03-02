terraform {
  cloud {
    organization = "chaokai"
    workspaces {
      name = "devops-frontend"
    }
  }
}
