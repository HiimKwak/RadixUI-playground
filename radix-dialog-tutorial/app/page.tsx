"use client";

import { Cross1Icon, Pencil1Icon } from "@radix-ui/react-icons";
import * as Dialog from "@radix-ui/react-dialog";
import { Contact, useContacts } from "@/lib/contacts";
import { FormEvent, useState } from "react";

export default function Page() {
  let { contacts } = useContacts();

  return (
    <div className="py-10">
      <div className="max-w-sm p-4 mx-auto space-y-4 bg-gray-200 rounded-lg">
        {contacts.map((contact) => (
          <ContactCard key={contact.id} contact={contact} />
        ))}
      </div>
    </div>
  );
}

function ContactCard({ contact }: { contact: Contact }) {
  let { updateContact } = useContacts();
  let [open, setOpen] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    let data = Object.fromEntries(new FormData(event.currentTarget));
    console.log(data);

    await updateContact(contact.id, data);
    setOpen(false);
  }

  return (
    <div
      className="flex justify-between px-4 py-4 text-gray-900 bg-white rounded-lg shadow"
      key={contact.id}
    >
      <div>
        <p>{contact.name}</p>
        <p className="text-sm text-gray-500">{contact.role}</p>
        <p className="text-sm text-gray-500">{contact.email}</p>
      </div>

      <Dialog.Root open={open} onOpenChange={setOpen}>
        <Dialog.Trigger className="p-2 rounded hover:bg-gray-200">
          <Pencil1Icon />
        </Dialog.Trigger>

        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50" />
          <Dialog.Content className="fixed w-full max-w-md p-8 text-gray-900 -translate-x-1/2 -translate-y-1/2 bg-white rounded-md shadow left-1/2 top-1/2">
            <div className="flex items-center justify-between">
              <Dialog.Title className="text-xl">Edit contact</Dialog.Title>
              <Dialog.Close className="text-gray-400 hover:text-gray-500">
                <Cross1Icon />
              </Dialog.Close>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="mt-8">
                <ContactFields contact={contact} />
              </div>
              <div className="mt-8 space-x-6 text-right">
                <Dialog.Close className="px-4 py-2 text-sm font-medium text-gray-500 rounded hover:text-gray-600">
                  Cancel
                </Dialog.Close>
                <button className="px-4 py-2 text-sm font-medium text-white bg-green-500 rounded hover:bg-green-600">
                  Save
                </button>
              </div>
            </form>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    </div>
  );
}

function ContactFields({ contact }: { contact: Contact }) {
  return (
    <div className="space-y-6">
      <div>
        <label className="text-sm font-medium text-gray-900">Name</label>
        <input
          autoFocus
          className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
          type="text"
          defaultValue={contact.name}
          name="name"
        />
      </div>

      <div>
        <label className="text-sm font-medium leading-6 text-gray-900">
          Role
        </label>
        <input
          className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
          type="text"
          defaultValue={contact.role}
          name="role"
        />
      </div>
      <div>
        <label className="text-sm font-medium leading-6 text-gray-900">
          Email address
        </label>
        <input
          className="mt-2 block w-full rounded-md border border-gray-300 px-2 py-1.5 text-sm text-gray-900 shadow-sm sm:leading-6"
          type="text"
          defaultValue={contact.email}
          name="email"
        />
      </div>
    </div>
  );
}
