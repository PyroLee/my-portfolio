import { getDictionary } from "../../dictionaries";
import ContactClient from "./ContactClient";

export default async function ContactPage({ params }) {
  const resolvedParams = await params;
  const dict = await getDictionary(resolvedParams.lang);

  return (
    <ContactClient dict={dict} lang={resolvedParams.lang} />
  );
}
