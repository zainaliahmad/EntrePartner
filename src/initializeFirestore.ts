// initializeFirestore.ts
import { doc, setDoc, DocumentReference } from "firebase/firestore";
import { db } from "./firebaseConfig";

interface FieldData {
  [key: string]: any;
}

// Function to create a document with null values in a sub-collection
const createDocumentInSubCollection = async (businessId: string, subCollectionName: string, docId: string, fields: string[]): Promise<DocumentReference> => {
  const docRef = doc(db, `businesses/${businessId}/${subCollectionName}`, docId);
  const data: FieldData = {};
  fields.forEach((field: string) => {
    data[field] = null;
  });
  await setDoc(docRef, data);
  return docRef;
};

// Function to initialize sub-collections for a business
export const initializeDatabase = async (businessId: string): Promise<void> => {
  // CRM collections
  await createDocumentInSubCollection(businessId, 'crm_contacts', 'contact1', ['companyId', 'name', 'email', 'phone', 'tags', 'notes', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'crm_opportunities', 'opportunity1', ['companyId', 'contactId', 'value', 'probability', 'stage', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'crm_tasks', 'task1', ['companyId', 'description', 'assignedTo', 'dueDate', 'status', 'priority', 'relatedEntity', 'entityId', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'crm_interactions', 'interaction1', ['companyId', 'contactId', 'date', 'type', 'notes', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'crm_leads', 'lead1', ['companyId', 'contactId', 'source', 'status', 'assignedTo', 'leadScore', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'crm_campaigns', 'campaign1', ['companyId', 'name', 'description', 'targetSegment', 'startDate', 'endDate', 'status', 'performance', 'createdAt', 'updatedAt']);

  // Inventory collections
  await createDocumentInSubCollection(businessId, 'inventory_products', 'product1', ['companyId', 'name', 'description', 'category', 'stockLevel', 'reorderPoint', 'batchNumbers', 'serialNumbers', 'warehouse', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'inventory_warehouses', 'warehouse1', ['companyId', 'location', 'bins', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'inventory_salesOrders', 'salesOrder1', ['companyId', 'customer', 'items', 'status', 'createdAt', 'updatedAt']);

  // Accounting collections
  await createDocumentInSubCollection(businessId, 'accounting_generalLedger', 'entry1', ['companyId', 'account', 'debit', 'credit', 'description', 'date', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'accounting_accountsPayable', 'payable1', ['companyId', 'vendor', 'amount', 'dueDate', 'status', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'accounting_accountsReceivable', 'receivable1', ['companyId', 'customer', 'amount', 'dueDate', 'status', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'accounting_bankAccounts', 'account1', ['companyId', 'bankName', 'accountNumber', 'balance', 'transactions', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'accounting_financialReports', 'report1', ['companyId', 'type', 'period', 'data', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'accounting_taxes', 'tax1', ['companyId', 'type', 'amount', 'dueDate', 'status', 'createdAt', 'updatedAt']);

  // Purchasing collections
  await createDocumentInSubCollection(businessId, 'purchasing_orders', 'order1', ['companyId', 'supplierId', 'orderDate', 'items', 'totalAmount', 'status', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'purchasing_suppliers', 'supplier1', ['companyId', 'name', 'contactDetails', 'address', 'email', 'phone', 'createdAt', 'updatedAt']);
  await createDocumentInSubCollection(businessId, 'purchasing_requisitions', 'requisition1', ['companyId', 'requestedBy', 'items', 'status', 'approvedBy', 'createdAt', 'updatedAt']);
};
