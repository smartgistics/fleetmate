import React from "react";
import { FormData, Client } from "@/types/truckmate";
import { useQuery } from "@tanstack/react-query";
import { fetchClients } from "@/services/truckMateService";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";

interface CustomerTabProps {
  formData: FormData;
  setFormData: React.Dispatch<React.SetStateAction<FormData>>;
}

export function CustomerTab({ formData, setFormData }: CustomerTabProps) {
  const { data: customers, isLoading } = useQuery({
    queryKey: ["customers"],
    queryFn: () => fetchClients(),
  });

  const handleCustomerChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCustomer = customers?.clients.find(
      (c: Client) => c.clientId === e.target.value
    );

    if (selectedCustomer) {
      setFormData({
        ...formData,
        customer: selectedCustomer.name,
        customerId: selectedCustomer.clientId,
        customerContact: selectedCustomer.altContact || "",
        contactPhone: selectedCustomer.businessPhone || "",
        billingAddress: [
          selectedCustomer.address1,
          selectedCustomer.address2,
          `${selectedCustomer.city}, ${selectedCustomer.province} ${selectedCustomer.postalCode}`,
          selectedCustomer.country,
        ]
          .filter(Boolean)
          .join("\n"),
        parentAccount: selectedCustomer.parentAccount || "",
        creditStatus: selectedCustomer.creditStatus || "",
      });
    }
  };

  return (
    <div className='space-y-8'>
      {/* Account Information Section */}
      <div>
        <h3 className='text-lg font-semibold mb-4'>Account Information</h3>
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label htmlFor='companyName'>Company Name</Label>
            <div className='flex gap-2'>
              <select
                id='companyName'
                className='flex-1 h-10 rounded-md border border-input bg-background px-3 py-2'
                value={formData.customerId}
                onChange={handleCustomerChange}
                disabled={isLoading}
              >
                <option value=''>Select a customer</option>
                {customers?.clients.map((customer) => (
                  <option key={customer.clientId} value={customer.clientId}>
                    {customer.name}
                  </option>
                ))}
              </select>
              <Button variant='ghost' size='icon'>
                <MoreHorizontal className='h-4 w-4' />
              </Button>
            </div>
          </div>

          <div className='space-y-2'>
            <Label htmlFor='parentCompany'>Parent Company</Label>
            <Input
              id='parentCompany'
              value={formData.parentAccount}
              readOnly
              placeholder='[PARENT ACCOUNT]'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='customerId'>Customer ID</Label>
            <Input
              id='customerId'
              value={formData.customerId}
              readOnly
              placeholder='[Customer ID]'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='status'>Status</Label>
            <Input
              id='status'
              value={formData.status}
              readOnly
              placeholder='Active'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='revenue'>Revenue</Label>
            <Input
              id='revenue'
              value='$XXX,XXX.XXXX'
              readOnly
              placeholder='$XXX,XXX.XXXX'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='creditStatus'>Credit Status</Label>
            <Input
              id='creditStatus'
              value={formData.creditStatus}
              readOnly
              placeholder='[STATUS]'
            />
          </div>
        </div>
      </div>

      {/* Contact Information Section */}
      <div>
        <h3 className='text-lg font-semibold mb-4'>Contact Information</h3>
        <div className='grid grid-cols-2 gap-6'>
          <div className='space-y-2'>
            <Label htmlFor='email'>Email</Label>
            <Input
              id='email'
              type='email'
              value={formData.contactEmail}
              onChange={(e) =>
                setFormData({ ...formData, contactEmail: e.target.value })
              }
              placeholder='email@address.com'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='phone'>Phone</Label>
            <Input
              id='phone'
              type='tel'
              value={formData.contactPhone}
              onChange={(e) =>
                setFormData({ ...formData, contactPhone: e.target.value })
              }
              placeholder='904-555-5555'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='accountManager'>Account Manager</Label>
            <Input
              id='accountManager'
              value={formData.accountManager}
              onChange={(e) =>
                setFormData({ ...formData, accountManager: e.target.value })
              }
              placeholder='Jim Smith'
            />
          </div>

          <div className='space-y-2'>
            <Label htmlFor='orderPlanner'>Order Planner</Label>
            <Input
              id='orderPlanner'
              value={formData.orderPlanner}
              onChange={(e) =>
                setFormData({ ...formData, orderPlanner: e.target.value })
              }
              placeholder='Steve Connor'
            />
          </div>
        </div>
      </div>
    </div>
  );
}
