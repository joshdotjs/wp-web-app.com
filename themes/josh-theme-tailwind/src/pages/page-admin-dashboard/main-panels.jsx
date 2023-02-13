import PanelOrders from './panel-orders';
import PanelAccount from './panel-account';
import PanelProducts from './panel-products/_panel-products';
import PanelUsers from './panel-users';
import PanelDropdowns from './panel-dropdowns';

// ==============================================

export default function Panels({ panel_refs }) {

  // --------------------------------------------

  return (
    <>
      <div class="relative">

        <PanelOrders panel_refs={panel_refs} />

        <PanelProducts panel_refs={panel_refs} />

        <PanelAccount panel_refs={panel_refs} />

        <PanelUsers panel_refs={panel_refs} />

        <PanelDropdowns panel_refs={panel_refs} />

      </div>
    </>
  );
}