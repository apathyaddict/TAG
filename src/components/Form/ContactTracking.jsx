import React, { useState, useEffect } from "react";
import { BiLoader } from "react-icons/bi";
import { db } from "../../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { MdDelete } from "react-icons/md";

const ContactTracking = ({ restaurant, setRestaurant, id }) => {
  const [contactDate, setContactDate] = useState("");
  const [contactType, setContactType] = useState("");
  const [notes, setNotes] = useState("");
  const [contacts, setContacts] = useState(restaurant.contacts || []);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (restaurant && restaurant.contacts) {
      setContacts(restaurant.contacts);
    }
  }, [restaurant]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    const newContact = {
      contact_date: contactDate,
      contact_type: contactType,
      notes: notes,
    };

    const updateSuccessful = await handleEdit(newContact);

    if (updateSuccessful) {
      const updatedContacts = [...contacts, newContact];
      setContacts(updatedContacts);
      setRestaurant({
        ...restaurant,
        contacts: updatedContacts,
      });

      setContactDate("");
      setContactType("");
      setNotes("");
    }
  };
  const handleEdit = async (newContact) => {
    setLoading(true);

    const updatedContactInfo = {
      ...restaurant,
      contacts: [...(restaurant.contacts || []), newContact],
      date_modified: new Date().toISOString(),
    };

    try {
      await updateDoc(doc(db, "fiches", id), updatedContactInfo);
      setLoading(false);
      return true;
    } catch (error) {
      console.error("Error updating document: ", error);

      setLoading(false);
      return false;
    }
  };

  const handleDelete = async (index) => {
    setLoading(true);

    try {
      // Create a new list of contacts without the one to delete
      const updatedContacts = contacts.filter((_, i) => i !== index);

      // Update the document in Firestore with the new list of contacts
      await updateDoc(doc(db, "fiches", id), {
        contacts: updatedContacts,
        date_modified: new Date().toISOString(),
      });

      // Update local state
      setContacts(updatedContacts);
      setRestaurant({
        ...restaurant,
        contacts: updatedContacts,
      });

      console.log("Contact successfully deleted");
    } catch (error) {
      console.error("Error deleting contact: ", error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="bg-white w-full mx-auto p-6 rounded-lg shadow-md">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex gap-4">
          <div className="w-full">
            <label
              htmlFor="contact-date"
              className="block text-sm font-medium text-gray-500">
              Date :
            </label>
            <input
              type="date"
              id="contact-date"
              value={contactDate}
              onChange={(e) => setContactDate(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="w-full">
            <label
              htmlFor="contact-type"
              className="block text-sm font-medium text-gray-500">
              Méthode :
            </label>
            <select
              id="contact-type"
              value={contactType}
              onChange={(e) => setContactType(e.target.value)}
              required
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 h-[45px]">
              <option value="">Sélectionnez la méthode</option>
              <option value="Appel">Appel</option>
              <option value="Mail">Mail</option>
              <option value="Rendez-vous">Rendez-vous</option>
            </select>
          </div>

          <div className="w-full">
            <label
              htmlFor="notes"
              className="block text-sm font-medium text-gray-500">
              Remarques :
            </label>
            <textarea
              id="notes"
              rows={6}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 mt-1 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"></textarea>
          </div>
        </div>

        <div className="flex justify-end">
          <button
            className="relative uppercase font-semibold rounded-lg bg-blue-400 text-white border border-blue-500 hover:bg-blue-500 px-4 py-2 text-sm"
            type="submit"
            disabled={loading}>
            {loading ? (
              <BiLoader className="animate-spin" />
            ) : (
              "Enregistrer le contact"
            )}
          </button>
        </div>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4">Journal des contacts</h3>
        <table className="w-full border-collapse border border-gray-300 table-fixed">
          <thead>
            <tr className="bg-gray-100 text-slate-700">
              <th className="w-1/3 border border-gray-300 px-4 py-2 text-left">
                Date
              </th>
              <th className="w-1/3 border border-gray-300 px-4 py-2 text-left">
                Type
              </th>
              <th className="w-1/3 border border-gray-300 px-4 py-2 text-left">
                Remarques
              </th>
              <th className="w-1/12 border border-gray-300 px-4 py-2 text-left">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {contacts.map((contact, index) => (
              <tr key={index}>
                <td className="w-1/3 border border-gray-300 px-4 py-2">
                  {new Date(contact.contact_date).toLocaleDateString("fr-FR")}
                </td>
                <td className="w-1/3 border border-gray-300 px-4 py-2">
                  {contact.contact_type}
                </td>
                <td className="w-1/3 border border-gray-300 px-4 py-2">
                  {contact.notes}
                </td>
                <td className="w-1/12 border border-gray-300 px-4 py-2 text-center ">
                  <div className="bg-red-500  rounded-lg  hover:bg-red-800 flex items-center justify-center  ">
                    <button
                      onClick={() => handleDelete(index)}
                      className=" h-5 w-5 radius-md text-white">
                      <MdDelete />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ContactTracking;
