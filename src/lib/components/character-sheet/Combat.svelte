<script lang="ts">
    import Section from '$lib/components/common/Section.svelte';
    import Weapons from '$lib/components/character-sheet/Weapons.svelte';
    import Armor from '$lib/components/character-sheet/Armor.svelte';
</script>

<Section title="Armas e Armadura" let:locked>
    <Weapons {locked} />
    <Armor {locked} />
</Section>
