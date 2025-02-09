"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { FiUserPlus } from "react-icons/fi";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  
} from "@/components/ui/sheet";
import { NewCustomerForm } from "@/components/forms/customer";
import { SupplierForm } from '@/components/forms/suplliers'

export function SheetCustomer({ userId,buttonname,title,type }: { userId: string; buttonname: string; title: string; type: string }) {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const toggleSheet = () => setIsSheetOpen((prev: boolean) => !prev);

  return (
    <>
      <Sheet open={isSheetOpen} onOpenChange={toggleSheet}>
        <Button variant={"outline"} onClick={toggleSheet}>
          <FiUserPlus />
          {buttonname}
        </Button>

        <SheetContent className="w-full md:w-1/2 ">
          <SheetHeader>
            <SheetTitle className="font-montserrat font-bold text-3xl text-mdblue-500">
              {title}
            </SheetTitle>
          </SheetHeader>
          <div className="mt-10">
            {type === "customer" ? (
              <NewCustomerForm
              userId={userId}
              onClose={() => setIsSheetOpen(false)}
            />
            ) : type === "supplier" ? (
              <SupplierForm
              userId={userId}
              onClose={() => setIsSheetOpen(false)}
            />
            ) : type === "product" ? (
              <NewCustomerForm
              userId={userId}
              onClose={() => setIsSheetOpen(false)}
            />
            ) : null}
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
}
