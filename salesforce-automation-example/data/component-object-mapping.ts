/**
* Maps LWC/Aura component names to their related Salesforce object API name
* and the unique field used for record cleanup.
*
* Rules:
* - Every component that creates Salesforce records MUST have an entry here.
* - The `uniqueField` is the field whose value is made unique (e.g., appending a timestamp)
*   so the record can be queried back after creation.
* - The planner scans the component and decides which field to make unique —
*   that field name goes into `uniqueField`.
*/

export interface ComponentObjectMapping {
  objectApiName: string;
  uniqueField: string;
}

export const COMPONENT_OBJECT_MAP: Record<string, ComponentObjectMapping> = {
  boatSearch: {
    objectApiName: 'Boat__c',
    uniqueField: 'Name',
  },
  customerManager: {
    objectApiName: 'Bank_Customer__c',
    uniqueField: 'Name',
  },
  feedbackSubmission: {
    objectApiName: 'Feedback__c',
    uniqueField: 'Subject__c',  // Updated to match the form field
  },
  bankAccountManager: {
    objectApiName: 'Bank_Account__c',
    uniqueField: 'Name',
  },
  // Standard Salesforce objects accessed via the Lightning standard UI
  Account: {
    objectApiName: 'Account',
    uniqueField: 'Name',
  },
  Opportunity: {
    objectApiName: 'Opportunity',
    uniqueField: 'Name',
  },
  Contact: {
    objectApiName: 'Contact',
    uniqueField: 'LastName',
  },
  Lead: {
    objectApiName: 'Lead',
    uniqueField: 'LastName',
  },
  Task: {
    objectApiName: 'Task',
    uniqueField: 'Subject',
  },
  Event: {
    objectApiName: 'Event',
    uniqueField: 'Subject',
  },
  PlanCustomer: {
    objectApiName: 'Plan_Customer__c',
    uniqueField: 'Name',
  },
  FundAccountSelection: {
    objectApiName: 'Fund_Account_Selection__c',
    uniqueField: 'Name',
  },
};
 