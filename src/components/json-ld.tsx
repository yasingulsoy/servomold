/** Yapısal veri. `<` kaçırılır: metindeki bir `</script>` etiketi kapatamasın. */
export function JsonLd({ veri }: { veri: object }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(veri).replace(/</g, "\\u003c") }}
    />
  );
}
