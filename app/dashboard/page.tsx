import PageWrapper from "@/app/dashboard/_components/PageWrapper";

export default async function ProtectedPage() {
  // const supabase = await createClient()

  // const { data, error } = await supabase.auth.getClaims()
  // if (error || !data?.claims) {
  //   redirect('/auth/login')
  // }
  return <PageWrapper />;
}
