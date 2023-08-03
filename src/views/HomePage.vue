<template>
  <ion-page>
    <ion-header :translucent="true">
      <ion-toolbar>
        <ion-title>Kontakte</ion-title>
        <ion-button router-link="New">+</ion-button>
      </ion-toolbar>
    </ion-header>

    <ion-content :fullscreen="true">
      <div id="container">
        <ion-list>
          <ion-item>
            <ion-label>
              Lukas
            </ion-label>

          </ion-item>
          <ion-item>
            <ion-label>
              Roger
            </ion-label>
          </ion-item>
        </ion-list>
      </div>
    </ion-content>
  </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonHeader, IonItem, IonList, IonPage, IonTitle, IonToolbar } from '@ionic/vue';
import { IonButton } from '@ionic/vue';
import { defineComponent } from 'vue';
import { useIonRouter } from '@ionic/vue';


defineComponent({
  methods: {
    navigateToCreation() {
      const ionRouter = useIonRouter();
      ionRouter.push("/createNewContact");
    }
  },
});
</script>

<style scoped>
</style>
