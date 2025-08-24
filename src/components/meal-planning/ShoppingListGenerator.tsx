
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { X, ShoppingCart, Plus, Trash2 } from "lucide-react";
import { toast } from "sonner";

interface ShoppingListGeneratorProps {
  onClose: () => void;
}

interface ShoppingItem {
  id: string;
  name: string;
  category: string;
  quantity: string;
  checked: boolean;
}

export function ShoppingListGenerator({ onClose }: ShoppingListGeneratorProps) {
  const [newItemName, setNewItemName] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState("");
  const [newItemCategory, setNewItemCategory] = useState("Protein");
  const [shoppingList, setShoppingList] = useState<ShoppingItem[]>([
    { id: "1", name: "Chicken breast", category: "Protein", quantity: "2 lbs", checked: false },
    { id: "2", name: "Sweet potatoes", category: "Vegetables", quantity: "3 lbs", checked: false },
    { id: "3", name: "Brown rice", category: "Grains", quantity: "1 bag", checked: false },
    { id: "4", name: "Carrots", category: "Vegetables", quantity: "2 lbs", checked: false },
    { id: "5", name: "Fish oil supplements", category: "Supplements", quantity: "1 bottle", checked: false }
  ]);

  const categories = ["Protein", "Vegetables", "Grains", "Supplements", "Treats", "Other"];

  const addItem = () => {
    if (!newItemName.trim() || !newItemQuantity.trim()) {
      toast.error("Please enter both item name and quantity");
      return;
    }

    const newItem: ShoppingItem = {
      id: Date.now().toString(),
      name: newItemName,
      category: newItemCategory,
      quantity: newItemQuantity,
      checked: false
    };

    setShoppingList([...shoppingList, newItem]);
    setNewItemName("");
    setNewItemQuantity("");
    toast.success("Item added to shopping list");
  };

  const removeItem = (id: string) => {
    setShoppingList(shoppingList.filter(item => item.id !== id));
  };

  const toggleItem = (id: string) => {
    setShoppingList(shoppingList.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  const generateAutomaticList = () => {
    const automaticItems = [
      { name: "Lean ground turkey", category: "Protein", quantity: "2 lbs" },
      { name: "Pumpkin puree", category: "Vegetables", quantity: "1 can" },
      { name: "Quinoa", category: "Grains", quantity: "1 bag" },
      { name: "Blueberries", category: "Treats", quantity: "1 cup" },
      { name: "Salmon oil", category: "Supplements", quantity: "1 bottle" }
    ];

    const newItems = automaticItems.map(item => ({
      id: Date.now().toString() + Math.random(),
      name: item.name,
      category: item.category,
      quantity: item.quantity,
      checked: false
    }));

    setShoppingList([...shoppingList, ...newItems]);
    toast.success("Automatic shopping list generated based on common pet nutrition needs");
  };

  const groupedItems = shoppingList.reduce((groups, item) => {
    const category = item.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(item);
    return groups;
  }, {} as Record<string, ShoppingItem[]>);

  const completedItems = shoppingList.filter(item => item.checked).length;
  const totalItems = shoppingList.length;

  return (
    <Card className="bg-white/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShoppingCart className="h-5 w-5" />
            Shopping List Generator
          </div>
          <Button variant="ghost" size="sm" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Progress */}
        {totalItems > 0 && (
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-medium">Progress</span>
              <span className="text-sm text-gray-600">{completedItems} of {totalItems} items</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-green-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${totalItems > 0 ? (completedItems / totalItems) * 100 : 0}%` }}
              />
            </div>
          </div>
        )}

        {/* Add New Item */}
        <Card className="p-4 bg-gray-50">
          <h3 className="font-semibold mb-3">Add New Item</h3>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <Input
              placeholder="Item name"
              value={newItemName}
              onChange={(e) => setNewItemName(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
            />
            <Input
              placeholder="Quantity"
              value={newItemQuantity}
              onChange={(e) => setNewItemQuantity(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && addItem()}
            />
            <select 
              value={newItemCategory} 
              onChange={(e) => setNewItemCategory(e.target.value)}
              className="px-3 py-2 border rounded-md"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>
            <Button onClick={addItem}>
              <Plus className="h-4 w-4 mr-2" />
              Add
            </Button>
          </div>
        </Card>

        {/* Generate Automatic List */}
        <div className="flex justify-between items-center">
          <Button variant="outline" onClick={generateAutomaticList}>
            Generate Smart List
          </Button>
          <span className="text-sm text-gray-600">
            Based on balanced pet nutrition
          </span>
        </div>

        {/* Shopping List by Category */}
        <div className="space-y-4">
          {Object.entries(groupedItems).map(([category, items]) => (
            <Card key={category} className="p-4">
              <h3 className="font-semibold text-lg mb-3 text-gray-700 border-b pb-2">
                {category} ({items.length} items)
              </h3>
              <div className="space-y-2">
                {items.map(item => (
                  <div key={item.id} className="flex items-center justify-between p-2 rounded hover:bg-gray-50">
                    <div className="flex items-center space-x-3 flex-1">
                      <Checkbox
                        checked={item.checked}
                        onCheckedChange={() => toggleItem(item.id)}
                      />
                      <span className={`flex-1 ${item.checked ? 'line-through text-gray-500' : ''}`}>
                        {item.name}
                      </span>
                      <span className="text-sm text-gray-600 min-w-20">
                        {item.quantity}
                      </span>
                    </div>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => removeItem(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </Card>
          ))}
        </div>

        {shoppingList.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No items in your shopping list yet. Add some items or generate a smart list!
          </div>
        )}
      </CardContent>
    </Card>
  );
}
