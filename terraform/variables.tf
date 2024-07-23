# variables.tf

variable "prefix" {
  description = "Prefix for resource names."
  default     = "HubLab"
}

variable "environment" {
  description = "Deployment environment (e.g., dev, prod)."
  default     = "dev"
}

variable "location" {
  description = "Azure region for resource deployment."
  default     = "West Europe"
}

# Event Hub Namespace settings
variable "eventhub_namespace_name" {
  description = "Name of the Event Hub namespace."
  default     = "eventhub-namespace"
}

variable "eventhub_name" {
  description = "Name of the Event Hub."
  default     = "eventhub"
}

variable "authorization_rule_name" {
  description = "Name of the Event Hub authorization rule."
  default     = "eventhub-auth-rule"
}

variable "subscription_id" {
  description = "Azure subscription ID."
  type        = string
}

variable "tenant_id" {
  description = "Azure tenant ID."
  type        = string
}

variable "client_id" {
  description = "Azure client ID."
  type        = string
}

variable "client_secret" {
  description = "Azure client secret."
  type        = string
  sensitive   = true
}

