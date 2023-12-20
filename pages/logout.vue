<script setup>
const { logout } = useStrapiAuth();
const router = useRouter();
onMounted(() => {
  logout();
  router.push("/");
});
</script>
